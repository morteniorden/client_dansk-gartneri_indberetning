using System.Collections.Generic;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Security;
using Hangfire;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Commands.CreateStatementCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateStatementCommand : IRequest<int>
  {
    public int ClientId { get; set; }
    public int RevisionYear { get; set; }

    public class CreateStatementCommandHandler : IRequestHandler<CreateStatementCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMailService _mailService;
      private readonly IBackgroundJobClient _jobClient;

      public CreateStatementCommandHandler(IApplicationDbContext context, IMailService mailService, IBackgroundJobClient jobClient)
      {
        _context = context;
        _mailService = mailService;
        _jobClient = jobClient;
      }

      public async Task<int> Handle(CreateStatementCommand request, CancellationToken cancellationToken)
      {
        var userEntity = await _context.Users
          .FirstOrDefaultAsync(e => e.Id == request.ClientId && e.Role == RoleEnum.Client, cancellationToken: cancellationToken);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), request.ClientId);
        }

        var statement = new Statement
        {
          ClientId = request.ClientId,
          Client = (Client) userEntity,
          AccountingYear = request.RevisionYear,
          Status = StatementStatus.InvitedNotEdited,
          IsApproved = false
        };

        _context.Statements.Add(statement);

        _jobClient.Enqueue(() => _mailService.SendStatementInvitationEmail(userEntity.Email));
        await _context.SaveChangesAsync(cancellationToken);

        return statement.Id;
      }
    }
  }
}
