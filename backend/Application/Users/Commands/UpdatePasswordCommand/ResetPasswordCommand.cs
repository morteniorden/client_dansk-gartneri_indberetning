using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;

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

      public ResetPasswordCommandHandler(IApplicationDbContext context, ITokenService tokenService, IPasswordHasher passwordHasher, IMapper mapper)
      {
        _context = context;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
        _mapper = mapper;
      }

      public async Task<UserTokenDto> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
      {
        int userId;
        string tokenId;
        try
        {
          (userId, tokenId) = await _tokenService.ValidateSSOToken(request.SSOToken);
        }
        catch (Exception e)
        {
          throw new ArgumentException("The provided token was invalid");
        }

        var userEntity = await _context.Users.FindAsync(userId);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), userId);
        }

        if (userEntity.SSOTokenId != tokenId)
        {
          throw new ArgumentException("The provided token did not match the expected token.");
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