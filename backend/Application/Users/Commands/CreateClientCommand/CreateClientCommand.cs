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

namespace Application.Users.Commands.CreateClientCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateClientCommand : IRequest<int>
  {
    public ClientDto ClientDto;

    public class CreateAccountCommandHandler : IRequestHandler<CreateClientCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly IPasswordHasher _passwordHasher;
      private readonly ITokenService _tokenService;
      private readonly IMailService _mailService;
      private readonly IBackgroundJobClient _jobClient;

      public CreateAccountCommandHandler(IApplicationDbContext context, IPasswordHasher passwordHasher, ITokenService tokenService, IMailService mailService, IHttpContextAccessor accessor, IBackgroundJobClient jobClient)
      {
        _context = context;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _mailService = mailService;
        _jobClient = jobClient;
      }

      public async Task<int> Handle(CreateClientCommand request, CancellationToken cancellationToken)
      {
        if (_context.Users.Any(e => e.Email == request.ClientDto.Email))
        {
          throw new ArgumentException("The provided email address is already used by another user.");
        }

        var address1Entity = new Address
        {
          AddressLine1 = request.ClientDto.Address.AddressLine1,
          AddressLine2 = request.ClientDto.Address.AddressLine2,
          AddressLine3 = request.ClientDto.Address.AddressLine3,
          AddressLine4 = request.ClientDto.Address.AddressLine4
        };
        _context.Addresses.Add(address1Entity);

        var client = new Client
        {
          Name = request.ClientDto.Name,
          Email = request.ClientDto.Email,
          Tel = request.ClientDto.Tel,
          CVRNumber = request.ClientDto.CVRNumber,
          AddressId = address1Entity.Id,
          Address = address1Entity,
          Password = _passwordHasher.Hash("password123") //TODO: REMOVE
        };

        _context.Users.Add(client);

        var (tokenId, token) = await _tokenService.CreateSSOToken(client);
        client.SSOTokenId = tokenId;

        //Is it possible to avoid saving changes twice?
        //I'm doing it here because I think the user needs to have been assigned an ID before writing the token.
        client.SSOTokenId = tokenId;
        await _context.SaveChangesAsync(cancellationToken);

        _jobClient.Enqueue(() => _mailService.SendUserActivationEmail(client.Email, token));
        return client.Id;

      }
    }
  }
}
