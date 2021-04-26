using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.Users.Commands.UnassignAccountantCommand
{
  [Authorize(Role = RoleEnum.Client)]
  public class UnassignAccountantCommand : IRequest
  {
    public int StatementId { get; set; }

    public class UnassignAccountantCommandHandler : IRequestHandler<UnassignAccountantCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;

      public UnassignAccountantCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
      {
        _context = context;
        _currentUser = currentUser;
      }

      public async Task<Unit> Handle(UnassignAccountantCommand request, CancellationToken cancellationToken)
      {
        var statement = _context.Statements
          .Include(e => e.Accountant)
          .Include(e => e.Client)
          .FirstOrDefault(e => e.Id == request.StatementId && e.Client.Email == _currentUser.UserId);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.StatementId);
        }

        if (statement.Accountant == null)
        {
          throw new ArgumentException("The statement has no assigned accountant");
        }

        statement.Accountant.DeactivationTime = DateTimeOffset.Now;
        _context.Users.Update(statement.Accountant);

        statement.Accountant = null;
        statement.AccountantId = null;
        _context.Statements.Update(statement);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
