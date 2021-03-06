using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Application.Statements.Commands.UploadStatementFile
{
  [Authorize(Role = RoleEnum.Admin)]
  public class UploadStatementFileCommand : IRequest
  {
    public int StatementId { get; set; }
    public IFormFile StatementFile { get; set; }
    public class UploadStatementFileCommandHandler : IRequestHandler<UploadStatementFileCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly FileDriveOptions _options;

      public UploadStatementFileCommandHandler(IApplicationDbContext context, IOptions<FileDriveOptions> options)
      {
        _context = context;
        _options = options.Value;
      }

      public async Task<Unit> Handle(UploadStatementFileCommand request, CancellationToken cancellationToken)
      {
        Statement statement = await _context.Statements.FirstAsync(e => e.Id == request.StatementId, cancellationToken);
        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.StatementId);
        }
        // Make sure directory exist as an error would be thrown if it doesn't
        Directory.CreateDirectory(_options.StatementPath);

        // In case the file extension changes, delete the old to ensure no redundant data is saved
        if (statement.StatementFileName != null)
        {
          File.Delete(Path.Combine(_options.StatementPath, statement.StatementFileName));
        }

        string fileName = request.StatementId + "." + request.StatementFile.FileName.Split('.')[1];
        string filePath = Path.Combine(_options.StatementPath, fileName);


        using (Stream fileStream = new FileStream(filePath, FileMode.Create))
        {
          await request.StatementFile.CopyToAsync(fileStream, cancellationToken);
        }

        statement.StatementFileName = fileName;
        _context.Statements.Update(statement);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
