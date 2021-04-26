using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.UpdatePassword;
using System.Collections.Generic;
using Application.Accounts.Queries.GetCurrentAccountQuery;
using Application.Users.Commands.CreateAccountantCommand;
using Application.Users.Commands.CreateClientCommand;
using Application.Users.Commands.DeactivateUserCommand;
using Application.Users.Commands.UnassignAccountantCommand;
using Application.Users.Commands.UpdateUserCommand;
using Application.Users.Queries.GetAdminsQuery;
using Application.Users.Queries.GetClientsQuery;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      return await Mediator.Send(new GetCurrentUserQuery());
    }

    [HttpGet("clients")]
    public async Task<ActionResult<List<ClientDto>>> GetAllClients()
    {
      return await Mediator.Send(new GetClientsQuery());
    }

    [HttpPost("clients")]
    public async Task<ActionResult<int>> CreateClient([FromBody] CreateClientCommand command)
    {
      return await Mediator.Send(command);
    }


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

    [HttpPut("changePassword")]
    public async Task<ActionResult> UpdatePassword(UpdatePasswordCommand command)
    {
      await Mediator.Send(command);
      return NoContent();
    }

    [HttpPut("resetPassword")]
    public async Task<ActionResult<UserTokenDto>> ResetPassword(ResetPasswordCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}
