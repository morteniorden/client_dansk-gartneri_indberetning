using System.Threading.Tasks;
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
  }
}
