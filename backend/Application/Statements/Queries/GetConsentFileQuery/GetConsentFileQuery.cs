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
  public class GetConsentFileQuery : IRequest<ConsentFileDto>
  {
    public int StatementId { get; set; }

    public class GetConsentFileQueryHandler : IRequestHandler<GetConsentFileQuery, ConsentFileDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;
      private readonly FileDriveOptions _options;

      public GetConsentFileQueryHandler(IApplicationDbContext context, ICurrentUserService currentUser, IOptions<FileDriveOptions> options)
      {
        _context = context;
        _currentUser = currentUser;
        _options = options.Value;
      }
      public async Task<ConsentFileDto> Handle(GetConsentFileQuery request, CancellationToken cancellationToken)
      {
        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId, cancellationToken: cancellationToken);

        var statement = await _context.Statements.FindAsync(request.StatementId);

        if (statement == null)
        {
          throw new NotFoundException(nameof(Statement), request.StatementId);
        }

        if (!(statement.Client == currentUser || statement.Accountant == currentUser || currentUser.Role == RoleEnum.Admin))
        {
          throw new ForbiddenAccessException();
        }

        var file = Directory.EnumerateFiles(_options.ConsentPath, statement.Id + ".*")
          .FirstOrDefault();

        if (file == null)
        {
          throw new NotFoundException("File with consent for statement with id "+ statement.Id + " was not found.");
        }

        var result = new ConsentFileDto
        {
          StatementId = statement.Id,
        };

        using (Stream fileStream = new FileStream(file, FileMode.Open))
        {
          result.Stream = new byte[fileStream.Length];
          await fileStream.ReadAsync(result.Stream);
        }

        return result;
      }
    }
  }
}
