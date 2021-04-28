using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.Statements.Queries.GetMyStatements
{
  [Authenticated]
  public class GetStatementQuery : IRequest<StatementAndConsentDto>
  {
    public int Id { get; set; }

    public class GetStatementQueryHandler : IRequestHandler<GetStatementQuery, StatementAndConsentDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUser;
      private readonly FileDriveOptions _options;

      public GetStatementQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser, IOptions<FileDriveOptions> options)
      {
        _context = context;
        _mapper = mapper;
        _currentUser = currentUser;
        _options = options.Value;
      }
      public async Task<StatementAndConsentDto> Handle(GetStatementQuery request, CancellationToken cancellationToken)
      {
        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId, cancellationToken: cancellationToken);

        var statement = await _context.Statements
          .Where(e => (e.ClientId == currentUser.Id || e.AccountantId == currentUser.Id) && e.Id == request.Id)
          .ProjectTo<StatementDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync();

        var file = Directory.EnumerateFiles(_options.StatementPath, statement.Id + ".*")
          .FirstOrDefault();

        var result = new StatementAndConsentDto
        {
          Statement = statement
        };

        if (file == null) return result;

        using (Stream fileStream = new FileStream(file, FileMode.Open))
        {
          result.ConsentStream = new byte[fileStream.Length];
          await fileStream.ReadAsync(result.ConsentStream);
        }

        return result;
      }
    }
  }
}
