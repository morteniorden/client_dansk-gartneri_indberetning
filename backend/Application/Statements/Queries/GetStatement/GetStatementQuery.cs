using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Application.StatementInfos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Queries.GetMyStatements
{
  [Authenticated]
  public class GetStatementQuery : IRequest<StatementAndInfoDto>
  {
    public int Id { get; set; }

    public class GetStatementQueryHandler : IRequestHandler<GetStatementQuery, StatementAndInfoDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUser;
      private readonly IStatementInfoService _statementInfoService;

      public GetStatementQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser, IStatementInfoService statementInfoService)
      {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
        _statementInfoService = statementInfoService;
      }
      public async Task<StatementAndInfoDto> Handle(GetStatementQuery request, CancellationToken cancellationToken)
      {
        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);

        var statement = await _context.Statements
          .Where(e => e.AccountId == currentUser.AccountId && e.Id == request.Id)
          .ProjectTo<StatementDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync();

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        var statementInfo = await FindInfo(statement.RevisionYear);

        if (statementInfo == null)
        {
          //Check if, for some reason, the statementInfo for this year has not been created. 
          await _statementInfoService.CheckThisYearInfo();
          statementInfo = await FindInfo(statement.RevisionYear);

          if (statementInfo == null)
          {
            throw new NotFoundException(nameof(StatementInfo), statement.RevisionYear);
          }
        }

        return new StatementAndInfoDto
        {
          Statement = statement,
          StatementInfo = statementInfo
        };
      }

      private async Task<StatementInfoDto> FindInfo(int year)
      {
        return await _context.StatementInfo
          .Where(e => e.AccountingYear == year)
          .ProjectTo<StatementInfoDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync();
      }
    }
  }
}
