using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;

namespace Application.Accounts.Queries.GetAccountsQuery
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GetAccountsQuery : IRequest<List<AccountDto>>
  {
    public class GetAccountsQueryHandler : IRequestHandler<GetAccountsQuery, List<AccountDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetAccountsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<AccountDto>> Handle(GetAccountsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.Accounts
          .Include(x => x.Users)
          .ProjectTo<AccountDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return viewModel;
      }
    }
  }
}
