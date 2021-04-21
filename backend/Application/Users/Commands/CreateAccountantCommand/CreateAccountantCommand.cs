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
    public int StatementId { get; set; }
    public AccountantDto AccountantDto;

    public class CreateAccountantCommandHandler : IRequestHandler<CreateAccountantCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateAccountantCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateAccountantCommand request, CancellationToken cancellationToken)
      {
        var statement = await _context.Statements.FindAsync(request.StatementId);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.StatementId);
        }

        if (statement.Accountant != null)
        {
          throw new InvalidOperationException("Cannot assign a new accountant to the statement, as another accountant is already assigned.");
        }

        if (_context.Users.Any(e => e.Email == request.AccountantDto.Email))
        {
          throw new ArgumentException("The provided email address is already used by another user.");
        }

        var existingAccountant = (Accountant) await _context.Users
          .FirstOrDefaultAsync(e => e.Email == request.AccountantDto.Email && e.Role == RoleEnum.Accountant, cancellationToken: cancellationToken);

        //If the accountant exists
        if (existingAccountant != null)
        {
          //TODO: This has been commented out, because it made sense when an accountant were assigned to accounts. But now, shouldn't we allow them to be assigned to multiple statements?
          /*
          if (existingAccountant.DeactivationTime == null && existingAccountant.Statements.Count > 0)
          {
            throw new InvalidOperationException(
              "Cannot assign the given accountant to the statement, as the accountant is already assigned another statement. Unassign the accountant before assigning.");
          }
          */

          existingAccountant.DeactivationTime = null; //If the user was deactivated, activate it again
          statement.Accountant = existingAccountant;
          statement.AccountantId = existingAccountant.Id;

          await _context.SaveChangesAsync(cancellationToken);

          //TODO: Send email to accountant to notify that he/she has been assigned a new account
          return existingAccountant.Id;
        }

        //If the accountant doesn't exists, create a new one
        var accountantEntity = new Accountant
        {
          Id = 0,
          Name = request.AccountantDto.Name,
          Email = request.AccountantDto.Email,
          Role = RoleEnum.Accountant,
          AccountantType = request.AccountantDto.AccountantType
        };
        statement.Accountant = accountantEntity;
        statement.AccountantId = accountantEntity.Id;


        await _context.Users.AddAsync(accountantEntity, cancellationToken);


        await _context.SaveChangesAsync(cancellationToken);

        //TODO: Send email to accountant
        return accountantEntity.Id;
      }
    }
  }
}
