using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;

namespace Application.Statements.Queries.CheckCasefileStatus
{
  [Authenticated]
  public class CheckCaseFileSignedQuery : IRequest<bool>
  {
    public int StatementId { get; set; }
    public int CaseFileId { get; set; }

    public class CheckCaseFileSignedQueryHandler : IRequestHandler<CheckCaseFileSignedQuery, bool>
    {
      private readonly IApplicationDbContext _context;
      private readonly IPenneoClient _penneoClient;

      public CheckCaseFileSignedQueryHandler(IApplicationDbContext context, IPenneoClient penneoClient)
      {
        _context = context;
        _penneoClient = penneoClient;
      }
      public async Task<bool> Handle(CheckCaseFileSignedQuery request, CancellationToken cancellationToken)
      {
        var statement = await _context.Statements.FindAsync(request.StatementId);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.StatementId);
        }

        // _penneoClient.StartConnection();
        // var completed = _penneoClient.IsCaseFileSigned(request.CaseFileId);

        // if (completed && request.CaseFileId == statement.ClientCaseFileId && statement.Status != StatementStatus.SignedOff)
        // {
        //   statement.Status = StatementStatus.SignedOff;
        // }

        // if (completed && request.CaseFileId == statement.AccountantCaseFileId && !statement.IsApproved)
        // {
        //   statement.IsApproved = true;
        // }

        await _context.SaveChangesAsync(cancellationToken);

        return true;
      }
    }
  }
}
