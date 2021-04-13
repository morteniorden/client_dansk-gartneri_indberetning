using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Queries.GetMyStatements
{
  [Authenticated]
  public class GetMyStatementsQuery : IRequest<List<StatementDto>>
  {
    public class GetMyStatementsQueryHandler : IRequestHandler<GetMyStatementsQuery, List<StatementDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUser;

      public GetMyStatementsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
      {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
      }
      public async Task<List<StatementDto>> Handle(GetMyStatementsQuery request, CancellationToken cancellationToken)
      {
        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);

        var statement = await _context.Statements
          .Where(e => e.AccountId == currentUser.AccountId)
          .ProjectTo<StatementDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return statement;
      }
    }
  }
}
