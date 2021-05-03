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
      private readonly IMailService _mailService;
      private readonly ITokenService _tokenService;

      public SendResetPasswordCommandHandler(IApplicationDbContext context, IMailService mailService, ITokenService tokenService)
      {
        _context = context;
        _mailService = mailService;
        _tokenService = tokenService;
      }

      public async Task<Unit> Handle(SendResetPasswordCommand request, CancellationToken cancellationToken)
      {
        User userEntity = await _context.Users.FirstOrDefaultAsync(e => e.Email == request.Email);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), request.Email);
        }

        var (tokenId, token) = await _tokenService.CreateSSOToken(userEntity);
        userEntity.SSOTokenId = tokenId;

        await _context.SaveChangesAsync(cancellationToken);

        BackgroundJob.Enqueue(() => _mailService.SendForgotPasswordEmail(request.Email, token));

        return Unit.Value;
      }
    }
  }
}
