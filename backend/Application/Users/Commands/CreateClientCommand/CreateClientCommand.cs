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
    public ClientDto ClientDto { get; set; }

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

        if (_context.Clients.Any(e => e.CVRNumber == request.ClientDto.CVRNumber))
        {
          throw new ArgumentException("The provided CVR number is already used by another client.");
        }

        var client = new Client
        {
          Name = request.ClientDto.Name,
          Email = request.ClientDto.Email,
          Tel = request.ClientDto.Tel,
          CVRNumber = request.ClientDto.CVRNumber,
          Address = new Address
          {
            FirmName = request.ClientDto.Address.FirmName,
            OwnerName = request.ClientDto.Address.OwnerName,
            AddressAndPlace = request.ClientDto.Address.AddressAndPlace,
            PostalCode = request.ClientDto.Address.PostalCode,
            City = request.ClientDto.Address.City
          },
          Password = _passwordHasher.Hash("password123") //TODO: REMOVE
        };
        _context.Users.Add(client);

        var (tokenId, token) = await _tokenService.CreateSSOToken(client);
        client.SSOTokenId = tokenId;

        await _context.SaveChangesAsync(cancellationToken);

        _jobClient.Enqueue(() => _mailService.SendUserActivationEmail(client.Email, token));
        return client.Id;

      }
    }
  }
}
