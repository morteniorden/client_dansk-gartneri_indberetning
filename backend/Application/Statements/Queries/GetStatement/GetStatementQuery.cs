using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Common.Security;
using Application.StatementInfos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

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
        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId, cancellationToken: cancellationToken);

        var statement = await _context.Statements
          .Include(e => e.Accountant)
          .Include(e => e.Client)
          .ProjectTo<StatementDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken: cancellationToken);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (!(statement.Client.Id == currentUser.Id || statement.Accountant.Id == currentUser.Id || currentUser.Role == RoleEnum.Admin))
        {
          throw new ForbiddenAccessException();
        }

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        var statementInfo = await FindInfo(statement.AccountingYear);

        if (statementInfo == null)
        {
          //Check if, for some reason, the statementInfo for this year has not been created.
          await _statementInfoService.CheckMissingYearsInfo();
          statementInfo = await FindInfo(statement.AccountingYear);

          if (statementInfo == null)
          {
            throw new NotFoundException(nameof(Domain.Entities.StatementInfo), statement.AccountingYear);
          }
        }

        return new StatementAndInfoDto
        {
          Statement = statement,
          StatementInfo = statementInfo
        };
      }

      private object Statement()
      {
        throw new NotImplementedException();
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
