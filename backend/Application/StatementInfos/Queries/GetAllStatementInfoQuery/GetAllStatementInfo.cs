using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.StatementInfos.Queries.GetStatementInfos
{
  [Authorize(Role=RoleEnum.Admin)]
  public class GetAllStatementInfoQuery : IRequest<List<StatementInfoDto>>
  {
    public class GetAllStatementInfoQueryHandler : IRequestHandler<GetAllStatementInfoQuery, List<StatementInfoDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly IStatementInfoService _statementInfoService;

      public GetAllStatementInfoQueryHandler(IApplicationDbContext context, IMapper mapper, IStatementInfoService statementInfoService)
      {
        _context = context;
        _mapper = mapper;
        _statementInfoService = statementInfoService;
      }
      public async Task<List<StatementInfoDto>> Handle(GetAllStatementInfoQuery request, CancellationToken cancellationToken)
      {
        //Check if, for some reason, the statementInfo for this year has not been created;
        await _statementInfoService.CheckThisYearInfo();

        var statementInfo = await _context.StatementInfo
          .ProjectTo<StatementInfoDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

         return statementInfo;
      }
    }
  }
}
