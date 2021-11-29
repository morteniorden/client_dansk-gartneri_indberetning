using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Users.Commands.UpdatePassword
{
  public class ResetPasswordCommand : IRequest<UserTokenDto>
  {
    public string SSOToken { get; set; }
    public string NewPassword { get; set; }

    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, UserTokenDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly ITokenService _tokenService;
      private readonly IPasswordHasher _passwordHasher;
      private readonly IMapper _mapper;

      private readonly ILogger<ResetPasswordCommandHandler> _logger;

      public ResetPasswordCommandHandler(IApplicationDbContext context, ITokenService tokenService, IPasswordHasher passwordHasher, IMapper mapper, ILogger<ResetPasswordCommandHandler> logger)
      {
        _context = context;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
        _mapper = mapper;
        _logger = logger;
      }

      public async Task<UserTokenDto> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
      {
        string userEmail;
        string tokenId;
        try
        {
          (userEmail, tokenId) = await _tokenService.ValidateSSOToken(request.SSOToken);
        }
        catch (Exception ex)
        {
          _logger.LogError(ex, "The provided token was invalid");
          throw new ArgumentException("The provided token was invalid");
        }

        var userEntity = await _context.Users.FirstOrDefaultAsync(x => x.Email == userEmail);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), userEmail);
        }

        if (userEntity.SSOTokenId != tokenId)
        {
          throw new ArgumentException($"The provided token did not match the expected token. Expected '{userEntity.SSOTokenId}' found '{tokenId}'.");
        }

        userEntity.SSOTokenId = null;
        userEntity.Password = _passwordHasher.Hash(request.NewPassword);

        _context.Users.Update(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        //return a JWT token
        var token = _tokenService.CreateToken(userEntity);
        return new UserTokenDto
        {
          User = _mapper.Map<UserDto>(userEntity),
          Token = token
        };
      }
    }
  }
}
