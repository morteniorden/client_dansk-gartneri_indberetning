using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Options;
using Application.Common.Security;
using Domain.EntityExtensions;
using Domain.Enums;
using Microsoft.Extensions.Options;

namespace Application.Statements.Commands.SignOffStatement
{
  [Authenticated]
  public class SignOffStatementCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }

    public class SignOffStatementCommandHandler : IRequestHandler<SignOffStatementCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;
      private readonly StatementOptions _options;

      public SignOffStatementCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser, IOptions<StatementOptions> options)
      {
        _context = context;
        _currentUser = currentUser;
        _options = options.Value;
      }

      public async Task<Unit> Handle(SignOffStatementCommand request, CancellationToken cancellationToken)
      {
        var statementEntity = await _context.Statements.FindAsync(request.Id);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Statement is already signed off.");
        }

        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);
        if (statementEntity.AccountId != currentUser.AccountId)
        {
          throw new UnauthorizedAccessException("Tried to sign off a statement that belongs to another account");
        }

        if (currentUser.Account.GetActiveAccountant() != null && !statementEntity.IsApproved)
        {
          throw new InvalidOperationException("The statement requires an approval by the assigned accountant before sign-off.");
        }

        if (statementEntity.GetTotal() >= _options.LimitForRequiredAccountant && !statementEntity.IsApproved)
        {
          throw new InvalidOperationException("The total turnover of the statement exceeds DKK " + _options.LimitForRequiredAccountant + ", which then requires an approval by an accountant.");
        }

        statementEntity.Status = StatementStatus.SignedOff;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
