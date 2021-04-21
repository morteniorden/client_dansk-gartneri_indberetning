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

namespace Application.Users.Queries.GetAdminsQuery
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GetAdminsQuery : IRequest<List<UserDto>>
  {
    public class GetAdminsQueryHandler : IRequestHandler<GetAdminsQuery, List<UserDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetAdminsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<UserDto>> Handle(GetAdminsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.Users
          .Where(e => e.Role == RoleEnum.Admin)
          .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return viewModel;
      }
    }
  }
}
