using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.EntityExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.CreateAccountantCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateAccountantCommand : IRequest<int>
  {
    public UserAccountIdDto AccountantDto;

    public class CreateAccountantCommandHandler : IRequestHandler<CreateAccountantCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateAccountantCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateAccountantCommand request, CancellationToken cancellationToken)
      {
        var account = await _context.Accounts.FindAsync(request.AccountantDto.AccountId);

        if (account == null)
        {
          throw new NotFoundException("The provided account id does not correspond to any existing account.");
        }

        if (account.GetActiveAccountant() != null)
        {
          throw new InvalidOperationException("Cannot assign a new accountant, because the account already has an active accountant. Unassign the accountant before assigning a new.");
        }

        if (_context.Admins.Any(e => e.Email == request.AccountantDto.Email))
        {
          throw new ArgumentException("The provided email address is already used by another user.");
        }

        if (_context.Users.Any(e => e.Email == request.AccountantDto.Email && e.Role != RoleEnum.Accountant))
        {
          throw new ArgumentException("The provided email address is already used by another user.");
        }

        var existingAccountant = await _context.Users
          .Include(x => x.Account)
          .FirstOrDefaultAsync(e => e.Email == request.AccountantDto.Email && e.Role == RoleEnum.Accountant);

        //If the accountant exists
        if (existingAccountant != null)
        {
          if (existingAccountant.DeactivationTime == null && existingAccountant.Account != null)
          {
            throw new InvalidOperationException(
              "Cannot assign the given accountant to a new account, as the accountant is already assigned another account. Unassign the accountant before assigning.");
          }

          existingAccountant.Account = account;
          existingAccountant.AccountId = account.Id;
          existingAccountant.DeactivationTime = null; //If the user was deactivated, activate it again

          await _context.SaveChangesAsync(cancellationToken);

          //TODO: Send email to accountant to notify that he/she has been assigned a new account
          return existingAccountant.Id;
        }

        //If the accountant doesn't exists, create a new one
        var accountantEntity = new User
        {
          Name = request.AccountantDto.Name,
          Email = request.AccountantDto.Email,
          Role = RoleEnum.Accountant,
          Account = account,
          AccountId = account.Id
        };

        _context.Users.Add(accountantEntity);

        //Check if the account has any unsigned statements, that now should need approval by the accountant
        var statements = account.Statements
          .Where(e => e.Status != StatementStatus.SignedOff);
        foreach (var statement in statements)
        {
          statement.ApprovalStatus = StatementApprovalStatus.AwaitsAccountant;
        }

        await _context.SaveChangesAsync(cancellationToken);

        //TODO: Send email to accountant
        return accountantEntity.Id;
      }
    }
  }
}
