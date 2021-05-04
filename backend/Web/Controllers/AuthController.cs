using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Mails.Commands.SendResetPasswordMailCommand;
using Application.Users.Commands.CheckAuthCommand;
using Application.Users;
using Application.Users.Commands.Login;
using Microsoft.Extensions.Options;
using Web.Options;

namespace Web.Controllers
{

  public class AuthController : ApiControllerBase
  {
    private readonly CorsOptions _corsOptions;

    public AuthController(IOptions<CorsOptions> corsOptions)
    {
      _corsOptions = corsOptions.Value;
    }

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

    [HttpPost("resetPassword")]
    public async Task<ActionResult> SendMailToResetPassword([FromBody] string email)
    {
      var result = await Mediator.Send(new SendResetPasswordCommand
      {
        Email = email
      });
      return NoContent();
    }
  }
}
