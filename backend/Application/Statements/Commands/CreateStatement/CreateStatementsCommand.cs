using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using Hangfire;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Commands.CreateStatement
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateStatementsCommand : IRequest
  {
    public IEnumerable<int> ClientIds { get; set; }
    public int RevisionYear { get; set; }

    public class CreateStatementsCommandHandler : IRequestHandler<CreateStatementsCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly IBackgroundJobClient _jobClient;
      private readonly IMailService _mailService;

      public CreateStatementsCommandHandler(IApplicationDbContext context, IBackgroundJobClient jobClient, IMailService mailService)
      {
        _context = context;
        _jobClient = jobClient;
        _mailService = mailService;
      }

      public async Task<Unit> Handle(CreateStatementsCommand request, CancellationToken cancellationToken)
      {
        var statementIds = new List<int>();

        List<User> userEntities = await _context.Users.Where(e => request.ClientIds.Contains(e.Id)).ToListAsync(cancellationToken);

        foreach (User client in userEntities)
        {
          Statement statement = new()
          {
            Client = (Client)client,
            AccountingYear = request.RevisionYear,
            Status = StatementStatus.InvitedNotEdited,
            IsApproved = false
          };

          _context.Statements.Add(statement);

          _jobClient.Enqueue(() => _mailService.SendStatementInvitationEmail(client.Email));
        }
        await _context.SaveChangesAsync(cancellationToken);
        return Unit.Value;
      }
    }
  }
}
