using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.CreateAccountantCommand
{
  [Authorize(Role = RoleEnum.Client)]
  public class CreateAccountantCommand : IRequest<int>
  {
    public AssignAccountantDto Dto { get; set; }

    public class CreateAccountantCommandHandler : IRequestHandler<CreateAccountantCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly IPasswordHasher _passwordHasher;

      public CreateAccountantCommandHandler(IApplicationDbContext context, IPasswordHasher passwordHasher)
      {
        _context = context;
        _passwordHasher = passwordHasher;
      }

      public async Task<int> Handle(CreateAccountantCommand request, CancellationToken cancellationToken)
      {
        var statement = await _context.Statements.FindAsync(request.Dto.StatementId);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.Dto.StatementId);
        }

        if (statement.Accountant != null)
        {
          throw new InvalidOperationException("Cannot assign a new accountant to the statement, as another accountant is already assigned.");
        }

        if (_context.Users.Any(e => e.Email == request.Dto.Email && e.Role != RoleEnum.Accountant))
        {
          throw new ArgumentException("The provided email address is already used by another user.");
        }

        var existingAccountant = (Accountant) await _context.Users
          .FirstOrDefaultAsync(e => e.Email == request.Dto.Email && e.Role == RoleEnum.Accountant, cancellationToken: cancellationToken);

        //If the accountant exists
        if (existingAccountant != null)
        {
          existingAccountant.DeactivationTime = null; //If the user was deactivated, activate it again
          statement.Accountant = existingAccountant;
          statement.AccountantId = existingAccountant.Id;
          statement.AccountantType = request.Dto.AccountantType;

          await _context.SaveChangesAsync(cancellationToken);

          //TODO: Send email to accountant to notify that he/she has been assigned a new account
          return existingAccountant.Id;
        }

        //If the accountant doesn't exists, create a new one
        var accountantEntity = new Accountant
        {
          Name = "", //TODO: What should we do with accountant name?
          Email = request.Dto.Email,
          Role = RoleEnum.Accountant,
          Password = _passwordHasher.Hash("password123") //TODO: REMOVE
        };

        statement.AccountantId = accountantEntity.Id;
        statement.Accountant = accountantEntity;
        statement.AccountantType = request.Dto.AccountantType;

        _context.Users.Add(accountantEntity);

        await _context.SaveChangesAsync(cancellationToken);

        //TODO: Send email to accountant
        return accountantEntity.Id;
      }
    }
  }
}
