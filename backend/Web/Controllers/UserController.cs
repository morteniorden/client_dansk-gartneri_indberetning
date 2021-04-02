using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.UpdatePassword;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetAllAdmins()
    {
      throw new NotImplementedException();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdatePassword([FromRoute] int id, [FromBody] UpdatePasswordCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);
      return NoContent();
    }
  }
}
