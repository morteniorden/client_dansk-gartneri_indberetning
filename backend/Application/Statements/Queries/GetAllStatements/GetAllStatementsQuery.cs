using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Queries.GetAllStatements
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GetAllStatementsQuery : IRequest<List<StatementDto>>
  {
    public class GetAllStatementsQueryQueryHandler : IRequestHandler<GetAllStatementsQuery, List<StatementDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetAllStatementsQueryQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<StatementDto>> Handle(GetAllStatementsQuery request, CancellationToken cancellationToken)
      {
        var statements = await _context.Statements
          .ProjectTo<StatementDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return statements;
      }
    }
  }
}
