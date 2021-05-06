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

namespace Application.Statements.Queries.GetMyStatements
{
  [Authenticated]
  public class GetStatementQuery : IRequest<StatementDto>
  {
    public int Id { get; set; }
    public bool CheckPenneoCompletion { get; set; }

    public class GetStatementQueryHandler : IRequestHandler<GetStatementQuery, StatementDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUser;
      private readonly IPenneoClient _penneoClient;

      public GetStatementQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser, IPenneoClient penneoClient)
      {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
        _penneoClient = penneoClient;
      }
      public async Task<StatementDto> Handle(GetStatementQuery request, CancellationToken cancellationToken)
      {
        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId, cancellationToken: cancellationToken);

        var statement = await _context.Statements
          .Include(e => e.Accountant)
          .Include(e => e.Client)
          .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken: cancellationToken);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (!(statement.Client.Id == currentUser.Id || statement.Accountant.Id == currentUser.Id || currentUser.Role == RoleEnum.Admin))
        {
          throw new ForbiddenAccessException();
        }

        if (request.CheckPenneoCompletion && statement.CaseFileId.HasValue)
        {
          _penneoClient.StartConnection();
          if (_penneoClient.IsCaseFileCompleted(statement.CaseFileId.GetValueOrDefault()))
          {
            statement.IsApproved = true;
            await _context.SaveChangesAsync(cancellationToken);
          }
        }

        return _mapper.Map<StatementDto>(statement);
      }
    }
  }
}
