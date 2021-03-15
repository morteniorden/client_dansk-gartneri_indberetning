using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users.Commands.CheckAuthCommand;
using Application.Users;
using Application.Users.Commands.Login;

namespace Web.Controllers
{

  public class AuthController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<UserTokenDto>> Login([FromBody] LoginCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpPut]
    public async Task<ActionResult<UserDto>> CheckAuth()
    {
      var result = await Mediator.Send(new CheckAuthCommand());
      return result;
    }
  }
}
