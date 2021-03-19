using System;
using System.Linq;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;

namespace Application.Accounts.Commands.CreateAccountCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateAccountCommand : IRequest<int>
  {
    public CreateAccountDto account;

    public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly IPasswordHasher _passwordHasher;

      public CreateAccountCommandHandler(IApplicationDbContext context, IPasswordHasher passwordHasher)
      {
        _context = context;
        _passwordHasher = passwordHasher;
      }

      public async Task<int> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
      {
        if (_context.Accounts.Any(e => e.Email == request.account.Email))
        {
          throw new ArgumentException("The provided email address is already used by another account.");
        }

        if (_context.Accounts.Any(e => e.CVRNumber == request.account.CVRNumber))
        {
          throw new ArgumentException("The provided CVR number is already used by another account.");
        }

        var address1Entity = new Address
        {
          AddressLine1 = request.account.AddressLine1,
          AddressLine2 = request.account.AddressLine2,
          AddressLine3 = request.account.AddressLine3,
          AddressLine4 = request.account.AddressLine4,
        };
        _context.Addresses.Add(address1Entity);

        var accountEntity = new Account
        {
          Name = request.account.Name,
          Email = request.account.Email,
          Tel = request.account.Tel,
          CVRNumber = request.account.CVRNumber,
          AddressId = address1Entity.Id,
          Address = address1Entity
        };

        _context.Accounts.Add(accountEntity);

        address1Entity.AccountId = accountEntity.Id;
        address1Entity.Account = accountEntity;

        var userEntity = new User
        {
          AccountId = accountEntity.Id,
          Account = accountEntity,
          Email = accountEntity.Email,
          Password = _passwordHasher.Hash("password123"), //temporary
          Role = RoleEnum.Client,
          Name = request.account.Name
        };

        _context.Users.Add(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return accountEntity.Id;
      }
    }
  }
}
