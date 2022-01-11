using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;
using MediatR;

namespace Application.Statements.Commands.CreateStatement
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateStatementsCommand : IRequest<IEnumerable<int>>
  {
    public IEnumerable<int> ClientIds { get; set; }
    public int RevisionYear { get; set; }

    public class CreateStatementsCommandHandler : IRequestHandler<CreateStatementsCommand, IEnumerable<int>>
    {
      private readonly IMediator _mediator;

      public CreateStatementsCommandHandler(IMediator mediator)
      {
        _mediator = mediator;
      }

      public async Task<IEnumerable<int>> Handle(CreateStatementsCommand request, CancellationToken cancellationToken)
      {
        List<int> statementIds = new();

        foreach (int ClientId in request.ClientIds)
        {
          statementIds.Add(await _mediator.Send(new CreateStatementCommand.CreateStatementCommand
          {
            ClientId = ClientId,
            RevisionYear = request.RevisionYear
          }, cancellationToken));
        }

        return statementIds;
      }
    }
  }
}
