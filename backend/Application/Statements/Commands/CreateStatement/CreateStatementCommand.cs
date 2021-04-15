using System.Collections.Generic;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Security;
using Domain.EntityExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Commands.CreateStatementCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateStatementCommand : IRequest<int>
  {
    public int AccountId { get; set; }
    public int RevisionYear { get; set; }

    public class CreateStatementCommandHandler : IRequestHandler<CreateStatementCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateStatementCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateStatementCommand request, CancellationToken cancellationToken)
      {
        var accountEntity = await _context.Accounts
          .Include(e => e.Users)
          .FirstOrDefaultAsync(e => e.Id == request.AccountId);

        if (accountEntity == null)
        {
          throw new NotFoundException(nameof(Account), request.AccountId);
        }

        var statement = new Statement
        {
          AccountId = request.AccountId,
          Account = accountEntity,
          RevisionYear = request.RevisionYear,
          Status = StatementStatus.InvitedNotEdited,
          IsApproved = false
        };

        _context.Statements.Add(statement);

        await _context.SaveChangesAsync(cancellationToken);

        return statement.Id;
      }
    }
  }
}
