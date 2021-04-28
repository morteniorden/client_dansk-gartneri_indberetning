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
        var statementEntity = await _context.Statements
          .Include(e => e.Accountant)
          .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken: cancellationToken);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Cannot approve a statement that is already signed off.");
        }

        if (statementEntity.IsApproved)
        {
          throw new InvalidOperationException("Statement is already approved");
        }

        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);
        if (statementEntity.AccountantId != currentUser.Id)
        {
          throw new UnauthorizedAccessException("Tried to approve a statement that is not assigned to this accountant.");
        }

        statementEntity.IsApproved = true;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}