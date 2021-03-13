using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Users.Commands.UpdatePassword;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePassword([FromRoute] int id, UpdatePasswordCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }
  }
}
