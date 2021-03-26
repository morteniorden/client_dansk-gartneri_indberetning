using System.Threading.Tasks;
using Application.Mails.Commands.GeneratePreviewMailCommand;
using Application.Mails.Commands.SendTestMailCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class MailController : ApiControllerBase
  {
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
