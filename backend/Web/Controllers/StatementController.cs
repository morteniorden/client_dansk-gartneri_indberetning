using System.Collections.Generic;
using System.Threading.Tasks;
using Application.StatementInfos;
using Application.StatementInfos.Commands.UpdateStatementInfo;
using Application.StatementInfos.Queries.GetStatementInfos;
using Application.Statements;
using Application.Statements.Commands.ConsentToStatement;
using Application.Statements.Commands.CreateStatementCommand;
using Application.Statements.Commands.SignOffStatement;
using Application.Statements.Commands.UpdateStatement;
using Application.Statements.Commands.UploadStatementFile;
using Application.Statements.Queries.CheckCasefileStatus;
using Application.Statements.Queries.GetAllStatements;
using Application.Statements.Queries.GetMyStatements;
using Application.Statements.Queries.GetStatementFile;
using Application.Statements.Queries.GetStatementsCSV;
using Application.Users.Commands.UnassignAccountantCommand;
using MediatR;
using Microsoft.AspNetCore.Http;
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
    public async Task<ActionResult<StatementAndInfoDto>> GetStatement([FromRoute] int id)
    {
      return await Mediator.Send(new GetStatementQuery
      {
        Id = id
      });
    }

    [HttpGet("{id}/isSigned")]
    public async Task<ActionResult<bool>> CheckIsSigned([FromRoute] int id, [FromQuery] int caseFileId)
    {
      return await Mediator.Send(new CheckCaseFileSignedQuery
      {
        StatementId = id,
        CaseFileId = caseFileId
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
    public async Task<GetSigningUrlDto> SignOffStatement([FromRoute] int id)
    {
      return await Mediator.Send(new SignOffStatementCommand
      {
        Id = id
      });
    }

    [HttpGet("csv")]
    public async Task<CSVResponseDto> GetStatementsCSV([FromQuery] int? accountingYear)
    {
      return await Mediator.Send(new GetStatementsCSVQuery
      {
        AccountingYear = accountingYear
      });
    }

    [HttpPut("statement/{id}/unassignAccountant")]
    public async Task<ActionResult> UnassignAccountant([FromRoute] int id)
    {
      await Mediator.Send(new UnassignAccountantCommand
      {
        StatementId = id
      });

      return NoContent();
    }

    [HttpPut("{id}/consent")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<GetSigningUrlDto>> ConsentToStatement([FromRoute] int id, IFormFile file)
    {

      return await Mediator.Send(new ConsentToStatementCommand
      {
        Dto = new StatementConsentDto()
        {
          File = file,
          StatementId = id
        }
      });

      //return NoContent();
    }

    [HttpGet("statementInfo")]
    public async Task<ActionResult<List<StatementInfoDto>>> GetAllStatementInfo()
    {
      return await Mediator.Send(new GetAllStatementInfoQuery());
    }

    [HttpPut("statementInfo/{year}")]
    public async Task<ActionResult<Unit>> UpdateStatementInfo([FromRoute] int year, [FromBody] UpdateStatementInfoCommand command)
    {
      command.AccountingYear = year;
      return await Mediator.Send(command);
    }

    [HttpGet("consent")]
    public async Task<ConsentFileDto> GetConsentFile([FromQuery] int statementId)
    {
      return await Mediator.Send(new GetConsentFileQuery()
      {
        StatementId = statementId
      });
    }

    [HttpPut("statement/{id}/file")]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<Unit>> UploadStatementFile([FromRoute] int id, IFormFile file)
    {
      await Mediator.Send(new UploadStatementFileCommand{
        StatementId = id,
        StatementFile = file
      });
      return NoContent();
    }

    [HttpGet("statement/{id}/file")]
    public async Task<FileResult> GetStatementFile([FromRoute] int id)
    {
      return await Mediator.Send(new GetStatementFileQuery{
        StatementId = id
      });
    }
  }
}
