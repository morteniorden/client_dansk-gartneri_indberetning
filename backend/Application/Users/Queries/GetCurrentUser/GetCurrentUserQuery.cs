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
using Application.Users;
using Domain.Enums;

namespace Application.Accounts.Queries.GetCurrentAccountQuery
{
  [Authenticated]
  public class GetCurrentUserQuery : IRequest<UserDto>
  {
    public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, UserDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;
      private readonly IMapper _mapper;

      public GetCurrentUserQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
      {
        _context = context;
       _currentUserService = currentUserService;
        _mapper = mapper;
      }
      public async Task<UserDto> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
      {
        var viewmodel = await _context.Users
          .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync(e => e.Email == _currentUserService.UserId);

        return viewmodel;
      }
    }
  }
}
