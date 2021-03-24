using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
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

    [HttpGet("resetPassword")]
    public IActionResult RedirectToResetPassword([FromQuery] string token)
    {
      var url = _corsOptions.Origins[0] + "/changepassword?token=";

      if (Regex.IsMatch(token, @"^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$"))
      {
        url += token;
      } else
      {
        throw new ArgumentException("The provided argument was not a valid token");
      }

      return Redirect(url);
    }

    [HttpPut("resetPassword")]
    public async Task<ActionResult<UserDto>> SendMailToResetPassword([FromBody] string email)
    {
      var result = await Mediator.Send(new CheckAuthCommand());
      return result;
    }
  }
}
