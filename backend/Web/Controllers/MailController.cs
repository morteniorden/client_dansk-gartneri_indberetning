using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Mails;
using Application.Mails.Commands.GeneratePreviewMailCommand;
using Application.Mails.Commands.SendTestMailCommand;
using Application.Mails.Commands.UpdateEmailCommand;
using Application.Mails.Queries.GetMailsQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class MailController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<EmailDto>>> GetAllMails()
    {
      return await Mediator.Send(new GetMailsQuery());
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateEmail([FromRoute] int id, UpdateEmailCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult> SendTestMail([FromBody] SendTestMailCommand command)
    {
      await Mediator.Send(command);
      return NoContent();
    }

    [HttpPost("preview")]
    public async Task<ActionResult<string>> GeneratePreview([FromBody] GeneratePreviewMailCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}
