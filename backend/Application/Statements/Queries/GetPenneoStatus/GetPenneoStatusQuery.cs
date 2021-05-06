using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.Statements.Queries.GetPenneoStatus
{
  [Authenticated]
  public class GetPenneoStatusQuery : IRequest<StatementDto>
  {
    public int StatementId { get; set; }

    public class GetPenneoStatusQueryHandler : IRequestHandler<GetPenneoStatusQuery, StatementDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUser;

      public GetPenneoStatusQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
      {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
      }
      public async Task<StatementDto> Handle(GetPenneoStatusQuery request, CancellationToken cancellationToken)
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

        return statement;
      }
    }
  }
}
