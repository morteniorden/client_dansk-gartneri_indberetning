using System;
using System.IO;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Options;
using Application.Common.Security;
using Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Statements.Commands.ConsentToStatement
{
  [Authorize(Role = RoleEnum.Accountant)]
  public class ConsentToStatementCommand : IRequest
  {
    [JsonIgnore]
    public StatementConsentDto Dto { get; set; }

    public class ConsentToStatementCommandHandler : IRequestHandler<ConsentToStatementCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;
      private readonly FileDriveOptions _options;

      public ConsentToStatementCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser, IOptions<FileDriveOptions> options)
      {
        _context = context;
        _currentUser = currentUser;
        _options = options.Value;
      }

      public async Task<Unit> Handle(ConsentToStatementCommand request, CancellationToken cancellationToken)
      {
        var statementEntity = await _context.Statements
          .Include(e => e.Accountant)
          .FirstOrDefaultAsync(e => e.Id == request.Dto.StatementId, cancellationToken: cancellationToken);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Dto.StatementId);
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Cannot approve a statement that is already signed off.");
        }

        if (statementEntity.IsApproved)
        {
          throw new InvalidOperationException("Statement is already approved");
        }

        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);
        if (statementEntity.AccountantId != currentUser.Id)
        {
          throw new UnauthorizedAccessException("Tried to approve a statement that is not assigned to this accountant.");
        }

        string fileType = request.Dto.File.ContentType.Substring(6);
        var filename = request.Dto.StatementId + "." + fileType;
        string filePath = Path.Combine(_options.StatementPath, filename);

        if (File.Exists(filePath))
        {
          throw new ArgumentException("Consent file for statement with id " + request.Dto.StatementId + " already exists.");
        }

        using (Stream fileStream = new FileStream(filePath, FileMode.Create))
        {
          await request.Dto.File.CopyToAsync(fileStream);
        }

        statementEntity.IsApproved = true;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
