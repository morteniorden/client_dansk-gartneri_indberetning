using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Common.Security;
using Domain.Entities;
using Domain.EntityExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Application.Statements.Commands.SignOffStatement
{
  [Authenticated]
  public class SignOffStatementCommand : IRequest<GetSigningUrlDto>
  {
    [JsonIgnore]
    public int Id { get; set; }

    public class SignOffStatementCommandHandler : IRequestHandler<SignOffStatementCommand, GetSigningUrlDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;
      private readonly StatementOptions _options;
      private readonly IPenneoClient _penneoClient;

      public SignOffStatementCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser, IOptions<StatementOptions> options, IPenneoClient penneoClient)
      {
        _context = context;
        _currentUser = currentUser;
        _options = options.Value;
        _penneoClient = penneoClient;
      }

      public async Task<GetSigningUrlDto> Handle(SignOffStatementCommand request, CancellationToken cancellationToken)
      {
        var statementEntity = await _context.Statements
          .Include(e => e.Client)
          .Include(e => e.Accountant)
          .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken: cancellationToken);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Statement is already signed off.");
        }

        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);
        if (statementEntity.ClientId != currentUser.Id)
        {
          throw new UnauthorizedAccessException("Tried to sign off a statement that belongs to another account");
        }

        if (statementEntity.Accountant != null && !statementEntity.IsApproved)
        {
          throw new InvalidOperationException("The statement requires an approval by the assigned accountant before sign-off.");
        }

        if (statementEntity.GetTotal() >= _options.LimitForRequiredAccountant && !statementEntity.IsApproved)
        {
          throw new InvalidOperationException("The total turnover of the statement exceeds DKK " + _options.LimitForRequiredAccountant + ", which then requires an approval by an accountant.");
        }

        // _penneoClient.StartConnection();
        // var (url, id) = _penneoClient.SignDoc(new StandardSignDTO
        // {
        //   DocPath = _options.ClientSigningPdfPath,
        //   SignerName = currentUser.Name, //TODO: Name, id or email?
        //   SignerCompany = statementEntity.Client.Name, //TODO: Name, id or email?
        //   RequestFailureUrl = _options.SigningFailureUrl,
        //   RequestSuccessUrl = _options.SigningSuccessUrl
        // });

        statementEntity.ClientCaseFileId = 3;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return new GetSigningUrlDto
        {
          Url = "",
          CaseFileId = 3
        };
      }
    }
  }
}
