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
  public class GetStatementQuery : IRequest<StatementDto>
  {
    public int Id { get; set; }

    public class GetStatementQueryHandler : IRequestHandler<GetStatementQuery, StatementDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUser;

      public GetStatementQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
      {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
      }
      public async Task<StatementDto> Handle(GetStatementQuery request, CancellationToken cancellationToken)
      {
        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);

        var statement = await _context.Statements
          .Where(e => e.AccountId == currentUser.AccountId && e.Id == request.Id)
          .ProjectTo<StatementDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync();

        return statement;
      }
    }
  }
}
