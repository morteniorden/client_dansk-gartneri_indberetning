using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Hangfire;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Mails.Commands.SendResetPasswordMailCommand
{
  public class SendResetPasswordCommand : IRequest
  {
    public string Email { get; set; }
    public class SendResetPasswordCommandHandler : IRequestHandler<SendResetPasswordCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly IHttpContextAccessor _accessor;
      private readonly IMailService _mailService;
      private readonly ITokenService _tokenService;

      public SendResetPasswordCommandHandler(IApplicationDbContext context, IMailService mailService, IHttpContextAccessor accessor, ITokenService tokenService)
      {
        _context = context;
        _mailService = mailService;
        _accessor = accessor;
        _tokenService = tokenService;
      }

      public async Task<Unit> Handle(SendResetPasswordCommand request, CancellationToken cancellationToken)
      {
        IUser userEntity = await _context.Users.FirstOrDefaultAsync(e => e.Email == request.Email);

        if (userEntity == null)
        {
          userEntity = await _context.Admins.FirstOrDefaultAsync(e => e.Email == request.Email);
        }

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(IUser), request.Email);
        }

        var (tokenId, token) = await _tokenService.CreateSSOToken(userEntity);
        userEntity.SSOTokenId = tokenId;

        await _context.SaveChangesAsync(cancellationToken);

        var host = _accessor.HttpContext.Request.Host;
        var baseUrl = "https://" + host;
        BackgroundJob.Enqueue(() => _mailService.SendForgotPasswordEmail(request.Email, token, baseUrl));

        return Unit.Value;
      }
    }
  }
}
