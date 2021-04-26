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
  public class GetClientsQuery : IRequest<List<ClientDto>>
  {
    public class GetClientsQueryHandler : IRequestHandler<GetClientsQuery, List<ClientDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetClientsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<ClientDto>> Handle(GetClientsQuery request, CancellationToken cancellationToken)
      {
        var results = await _context.Clients
          .Include(e => e.Address)
          .ToListAsync(cancellationToken);

        var viewModel = results.Select(x => _mapper.Map<ClientDto>(x)).ToList();

        return viewModel;
      }
    }
  }
}
