
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Hangfire;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Mails.Commands.SendRemindUserCommand
{
  public class SendRemindAllUsersCommand : IRequest
  {
    public IEnumerable<int> ClientIds { get; set; }

    public class SendRemindAllUsersCommandHandler : IRequestHandler<SendRemindAllUsersCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMailService _mailService;

      public SendRemindAllUsersCommandHandler(IApplicationDbContext context, IMailService mailService)
      {
        _context = context;
        _mailService = mailService;
      }

      public async Task<Unit> Handle(SendRemindAllUsersCommand request, CancellationToken cancellationToken)
      {
        IEnumerable<string> userEmails = await _context.Users.Where(e => request.ClientIds.Contains(e.Id)).Select(e => e.Email).ToListAsync(cancellationToken);

        foreach (string email in userEmails)
        {
          BackgroundJob.Enqueue(() => _mailService.SendReminderEmail(email));
        }

        return Unit.Value;
      }
    }
  }
}
