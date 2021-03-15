using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.Login
{
  public class LoginCommand : IRequest<UserTokenDto>
  {
    public LoginRequestDto LoginDetails;

    public class LoginCommandHandler : IRequestHandler<LoginCommand, UserTokenDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly IPasswordHasher _passwordHasher;
      private readonly ITokenService _tokenService;


      public LoginCommandHandler(IApplicationDbContext context, IPasswordHasher passwordHasher, ITokenService tokenService, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
      }

      public async Task<UserTokenDto> Handle(LoginCommand request, CancellationToken cancellationToken)
      {
        var user = await _context.Users
          .FirstOrDefaultAsync(x => x.Email.Equals(request.LoginDetails.Email));

        if (user == null)
        {
          throw new ArgumentException("The provided email could not be found.");
        }

        var (verified, needsUpgrade) = _passwordHasher.Check(user.Password, request.LoginDetails.Password);

        if (!verified)
        {
          throw new ArgumentException("Incorrect password.");
        }

        var token = _tokenService.CreateToken(user);
        return new UserTokenDto
        {
          User = _mapper.Map<UserDto>(user),
          Token = token
        };
      }
    }
  }
}