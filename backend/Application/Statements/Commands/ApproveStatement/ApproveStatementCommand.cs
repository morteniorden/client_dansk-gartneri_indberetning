using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;

namespace Application.Statements.Commands.ApproveStatement
{
  [Authorize(Role = RoleEnum.Accountant)]
  public class ApproveStatementCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }

    public class ApproveStatementCommandHandler : IRequestHandler<ApproveStatementCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;

      public ApproveStatementCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
      {
        _context = context;
        _currentUser = currentUser;
      }

      public async Task<Unit> Handle(ApproveStatementCommand request, CancellationToken cancellationToken)
      {
        var statementEntity = await _context.Statements.FindAsync(request.Id);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        //TODO: Modify to also consider consultants
        if (statementEntity.ApprovalStatus != StatementApprovalStatus.AwaitsAccountant)
        {
          throw new InvalidOperationException("The statement does not await an approval by an accountant.");
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Cannot approve a statement that is already signed off.");
        }

        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);
        if (statementEntity.AccountId != currentUser.AccountId)
        {
          throw new UnauthorizedAccessException("Tried to approve a statement that belongs to another account");
        }

        statementEntity.ApprovalStatus = StatementApprovalStatus.ReadyForSignOff;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
