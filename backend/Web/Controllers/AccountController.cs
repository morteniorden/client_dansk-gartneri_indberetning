using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Queries.GetAccountsQuery;

namespace Web.Controllers
{

  public class AccountController : ApiControllerBase
  {
    [HttpGet]
    public async Task<ActionResult<List<AccountDto>>> GetAllAccounts()
    {
      return await Mediator.Send(new GetAccountsQuery());
    }

  }
}
