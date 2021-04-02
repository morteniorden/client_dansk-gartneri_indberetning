using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Security;
using Domain.Enums;

namespace Application.Accounts.Queries.GetCurrentAccountQuery
{
  [Authorize]
  public class GetCurrentAccountQuery : IRequest<AccountDto>
  {
    public class GetCurrentAccountQueryHandler : IRequestHandler<GetCurrentAccountQuery, AccountDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;
      private readonly IMapper _mapper;

      public GetCurrentAccountQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
      {
        _context = context;
       _currentUserService = currentUserService;
        _mapper = mapper;
      }
      public async Task<AccountDto> Handle(GetCurrentAccountQuery request, CancellationToken cancellationToken)
      {
        var viewmodel = await _context.Accounts
          .Include(a => a.Users)
          .ProjectTo<AccountDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync(a => a.Users.Any(u => u.Id == int.Parse(_currentUserService.UserId)));

        return viewmodel;
      }
    }
  }
}
