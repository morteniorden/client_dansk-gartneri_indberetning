using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Common.Security;
using Domain.Enums;

namespace Application.Users.Queries.GetClientsQuery
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GetClientsQuery : IRequest<List<UserDto>>
  {
    public class GetClientsQueryHandler : IRequestHandler<GetClientsQuery, List<UserDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetClientsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<UserDto>> Handle(GetClientsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.Users
          .Where(user => user.Role == RoleEnum.Client)
          .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return viewModel;
      }
    }
  }
}
