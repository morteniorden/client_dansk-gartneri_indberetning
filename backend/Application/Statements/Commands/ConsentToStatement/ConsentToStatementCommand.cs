using System;
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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Application.Statements.Commands.ConsentToStatement
{
  [Authorize(Role = RoleEnum.Accountant)]
  public class ConsentToStatementCommand : IRequest<GetSigningUrlDto>
  {
    [JsonIgnore]
    public StatementConsentDto Dto { get; set; }

    public class ConsentToStatementCommandHandler : IRequestHandler<ConsentToStatementCommand, GetSigningUrlDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;
      private readonly FileDriveOptions _options;
      private readonly IPenneoClient _penneoClient;
      private readonly StatementOptions _statementOptions;

      public ConsentToStatementCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser, IOptions<FileDriveOptions> options, IPenneoClient penneoClient, IOptions<StatementOptions> statementOptions)
      {
        _context = context;
        _currentUser = currentUser;
        _options = options.Value;
        _penneoClient = penneoClient;
        _statementOptions = statementOptions.Value;
      }

      public async Task<GetSigningUrlDto> Handle(ConsentToStatementCommand request, CancellationToken cancellationToken)
      {
        var statementEntity = await _context.Statements
          .Include(e => e.Accountant)
          .Include(e => e.Client)
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

        string fileType = request.Dto.File.ContentType.Substring(12);
        var filename = request.Dto.StatementId + "." + fileType;
        string filePath = Path.Combine(_options.ConsentPath, filename);

        //TODO: Not sure if we should prevent writing the file, if one already exists
        //if (File.Exists(filePath))
        //{
        //  throw new ArgumentException("Consent file for statement with id " + request.Dto.StatementId + " already exists.");
        //}

        using (Stream fileStream = new FileStream(filePath, FileMode.Create))
        {
          await request.Dto.File.CopyToAsync(fileStream);
        }

        _penneoClient.StartConnection();
        var (url, id) = _penneoClient.SignDoc(new StandardSignDTO
        {
          DocPath = filePath,
          SignerName = currentUser.Email, //TODO: Is email OK to use for the accountant?
          SignerCompany = statementEntity.Client.Name, //TODO: Name, id or email?
          RequestFailureUrl = _statementOptions.SigningFailureUrl,
          RequestSuccessUrl = _statementOptions.SigningSuccessUrl
        });

        statementEntity.AccountantCaseFileId = id;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return new GetSigningUrlDto
        {
          Url = url,
          CaseFileId = id.GetValueOrDefault()
        };
      }
    }
  }
}
