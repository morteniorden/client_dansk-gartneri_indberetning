using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.Statements.Queries.GetStatementFile
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GetStatementFileQuery : IRequest<StatementFileDto>
  {
    public int StatementId { get; set; }
    public class GetStatementFileQueryHandler : IRequestHandler<GetStatementFileQuery, StatementFileDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly FileDriveOptions _options;

      public GetStatementFileQueryHandler(IApplicationDbContext context, IOptions<FileDriveOptions> options)
      {
        _context = context;
        _options = options.Value;
      }

      public async Task<StatementFileDto> Handle(GetStatementFileQuery request, CancellationToken cancellationToken)
      {
        Statement statement = await _context.Statements.FirstAsync(e => e.Id == request.StatementId, cancellationToken);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.StatementId);
        }

        // Make sure directory exist as an error would be thrown if it doesn't
        Directory.CreateDirectory(_options.StatementPath);

        string file = Directory.EnumerateFiles(_options.StatementPath, statement.StatementFileName)
          .FirstOrDefault();

        if (file == null)
        {
          throw new NotFoundException("Statement file for statement with id " + statement.Id + " was not found.");
        }

        StatementFileDto result = new()
        {
          FileName = statement.StatementFileName
        };

        using (Stream fileStream = new FileStream(file, FileMode.Open))
        {
          result.Data = new byte[fileStream.Length];
          await fileStream.ReadAsync(result.Data, cancellationToken);
        }

        return result;
      }
    }
  }
}
