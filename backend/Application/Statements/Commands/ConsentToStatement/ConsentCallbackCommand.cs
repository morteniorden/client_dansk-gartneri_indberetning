
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Commands.ConsentToStatement
{
  [Authorize(Role = RoleEnum.Accountant)]
  public class ConsentCallbackCommand : IRequest
  {
    public int Id { get; set; }
    public class ConsentCallbackCommandHandler : IRequestHandler<ConsentCallbackCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;

      public ConsentCallbackCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
      {
        _context = context;
        _currentUser = currentUser;
      }

      public async Task<Unit> Handle(ConsentCallbackCommand request, CancellationToken cancellationToken)
      {
        Statement statementEntity = await _context.Statements
          .Include(e => e.Accountant)
          .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Statement is already signed off.");
        }

        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);
        if (statementEntity.AccountantId != currentUser.Id)
          throw new UnauthorizedAccessException("Tried to sign off a statement the accountant is not accountant for");

        statementEntity.Status = StatementStatus.SignedOff;
        statementEntity.IsApproved = true;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
