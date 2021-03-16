using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Application.Users;

namespace Web.Controllers
{

  public class UserController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetAllAdmins()
    {
      throw new NotImplementedException();
    }
  }
}
