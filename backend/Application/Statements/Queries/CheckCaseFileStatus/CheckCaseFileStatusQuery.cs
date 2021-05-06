using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.Statements.Queries.CheckCasefileStatus
{
  [Authenticated]
  public class CheckCaseFileStatusQuery : IRequest
  {
    public int StatementId { get; set; }

    public class GetPenneoStatusQueryHandler : IRequestHandler<CheckCaseFileStatusQuery>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly IPenneoClient _penneoClient;

      public GetPenneoStatusQueryHandler(IApplicationDbContext context, IMapper mapper, IPenneoClient penneoClient)
      {
        _context = context;
        _mapper = mapper;
        _penneoClient = penneoClient;
      }
      public async Task<Unit> Handle(CheckCaseFileStatusQuery request, CancellationToken cancellationToken)
      {
        var statement = await _context.Statements.FindAsync(request.StatementId);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.StatementId);
        }

        _penneoClient.StartConnection();
        if (statement.Status != StatementStatus.SignedOff && statement.ClientCaseFileId.HasValue && _penneoClient.IsCaseFileCompleted(statement.ClientCaseFileId.GetValueOrDefault()))
        {
          statement.Status = StatementStatus.SignedOff;
        }

        if (!statement.IsApproved && statement.AccountantCaseFileId.HasValue && _penneoClient.IsCaseFileCompleted(statement.AccountantCaseFileId.GetValueOrDefault()))
        {
          statement.IsApproved = true;
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
