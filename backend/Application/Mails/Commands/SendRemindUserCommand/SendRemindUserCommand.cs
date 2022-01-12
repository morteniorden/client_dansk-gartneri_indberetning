
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Hangfire;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Mails.Commands.SendRemindUserCommand
{
  public class SendRemindUserCommand : IRequest
  {
    public string Email { get; set; }
    public class SendRemindUserCommandHandler : IRequestHandler<SendRemindUserCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMailService _mailService;

      public SendRemindUserCommandHandler(IApplicationDbContext context, IMailService mailService)
      {
        _context = context;
        _mailService = mailService;
      }

      public async Task<Unit> Handle(SendRemindUserCommand request, CancellationToken cancellationToken)
      {
        User userEntity = await _context.Users.FirstOrDefaultAsync(e => e.Email == request.Email, cancellationToken);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), request.Email);
        }

        BackgroundJob.Enqueue(() => _mailService.SendReminderEmail(request.Email));

        return Unit.Value;
      }
    }
  }
}
