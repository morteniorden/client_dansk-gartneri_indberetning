using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using Domain.Entities;
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

        if (_context.Accounts.Any(e => e.Email == request.AccountantDto.Email) || _context.Users.Any(e => e.Email == request.AccountantDto.Email))
        {
          throw new ArgumentException("The provided email address is already used by another user.");
        }

        var accountantEntity = new User
        {
          Name = request.AccountantDto.Name,
          Email = request.AccountantDto.Email,
          Role = RoleEnum.Accountant,
          Account = account,
          AccountId = account.Id
        };

        _context.Users.Add(accountantEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return accountantEntity.Id;
      }
    }
  }
}
