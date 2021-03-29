using System;
using System.Linq;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Hangfire;
using Microsoft.AspNetCore.Http;

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
      private readonly ITokenService _tokenService;
      private readonly IMailService _mailService;
      private readonly IHttpContextAccessor _accessor;
      private readonly IBackgroundJobClient _jobClient;

      public CreateAccountCommandHandler(IApplicationDbContext context, IPasswordHasher passwordHasher, ITokenService tokenService, IMailService mailService, IHttpContextAccessor accessor, IBackgroundJobClient jobClient)
      {
        _context = context;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _mailService = mailService;
        _accessor = accessor;
        _jobClient = jobClient;
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

        var (tokenId, token) = await _tokenService.CreateSSOToken(userEntity);
        userEntity.SSOTokenId = tokenId;

        //Is it possible to avoid saving changes twice?
        //I'm doing it here because I think the user needs to have been assigned an ID before writing the token.
        userEntity.SSOTokenId = tokenId;
        await _context.SaveChangesAsync(cancellationToken);

        _jobClient.Enqueue(() => _mailService.SendUserActivationEmail(userEntity.Email, token));

        return accountEntity.Id;
      }
    }
  }
}
