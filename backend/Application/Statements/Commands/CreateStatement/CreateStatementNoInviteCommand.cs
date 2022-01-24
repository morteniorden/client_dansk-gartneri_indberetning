using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Commands.CreateStatementCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateStatementNoInviteCommand : IRequest<int>
  {
    public int ClientId { get; set; }
    public int RevisionYear { get; set; }
    public class CreateStatementNoInviteCommandHandler : IRequestHandler<CreateStatementNoInviteCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateStatementNoInviteCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateStatementNoInviteCommand request, CancellationToken cancellationToken)
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

        await _context.SaveChangesAsync(cancellationToken);

        return statement.Id;
      }
    }
  }
}