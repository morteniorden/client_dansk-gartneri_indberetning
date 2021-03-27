using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Mails.Queries.GetMailsQuery
{
  public class GetMailsQuery : IRequest<List<EmailDto>>
  {
    public class GetMailsQueryHandler : IRequestHandler<GetMailsQuery, List<EmailDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetMailsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }
      public async Task<List<EmailDto>> Handle(GetMailsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.Emails
          .ProjectTo<EmailDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return viewModel;
      }
    }
  }
}
