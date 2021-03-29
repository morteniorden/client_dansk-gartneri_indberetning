using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.CreateAccountantCommand;
using Application.Users.Commands.DeactivateUserCommand;
using Application.Users.Commands.UpdatePassword;
using Application.Users.Commands.UpdateUserCommand;
using Application.Users.Queries.GetAdminsQuery;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet("admins")]
    public async Task<ActionResult<List<UserDto>>> GetAllAdmins()
    {
      return await Mediator.Send(new GetAdminsQuery());
    }

    [HttpPost("accountant")]
    public async Task<ActionResult<int>> CreateAndAddAccountant([FromBody] CreateAccountantCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser([FromRoute] int id, UpdateUserCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }

    [HttpPut("{id}/deactivate")]
    public async Task<ActionResult> DeactivateUser([FromRoute] int id)
    {
      await Mediator.Send(new DeactivateUserCommand
      {
        Id = id
      });

      return NoContent();
    }

    [HttpPut("{id}/changePassword")]
    public async Task<ActionResult> UpdatePassword([FromRoute] int id, [FromBody] UpdatePasswordCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);
      return NoContent();
    }
  }
}
