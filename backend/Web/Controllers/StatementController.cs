using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Application.StatementInfos;
using Application.StatementInfos.Queries.GetStatementInfos;
using Application.Statements;
using Application.Statements.Commands.CreateStatementCommand;
using Application.Statements.Commands.SignOffStatement;
using Application.Statements.Commands.UpdateStatement;
using Application.Statements.Queries.GetAllStatements;
using Application.Statements.Queries.GetMyStatements;
using Application.Statements.Queries.GetStatementsCSVQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class StatementController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<StatementDto>>> GetAllStatements()
    {
      return await Mediator.Send(new GetAllStatementsQuery());
    }

    [HttpGet("mystatements")]
    public async Task<ActionResult<List<StatementDto>>> GetMyStatements()
    {
      return await Mediator.Send(new GetMyStatementsQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StatementAndInfoDto>> getStatement([FromRoute] int id)
    {
      return await Mediator.Send(new GetStatementQuery
      {
        Id = id
      });
    }

    [HttpPost("statement")]
    public async Task<ActionResult<int>> CreateStatement([FromBody] CreateStatementCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateStatement([FromRoute] int id, UpdateStatementCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }

    [HttpPut("{id}/signoff")]
    public async Task<ActionResult> SignOffStatement([FromRoute] int id) { 
    
      await Mediator.Send(new SignOffStatementCommand
      {
        Id = id
      });

      return NoContent();
    }

    [HttpGet("csv")]
    public async Task<CSVResponseDto> GetStatementsCSV([FromQuery] int? accountingYear)
    {
      return await Mediator.Send(new GetStatementsCSVQuery
      {
        AccountingYear = accountingYear
      });
    }

    [HttpGet("statementInfo")]
    public async Task<ActionResult<List<StatementInfoDto>>> GetAllStatementInfo()
    {
      return await Mediator.Send(new GetAllStatementInfoQuery());
    }
  }
}
