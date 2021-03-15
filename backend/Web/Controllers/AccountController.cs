using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Commands.CreateAccountCommand;
using Application.Accounts.Queries.GetAccountsQuery;
using Application.Accounts.Queries.GetCurrentAccountQuery;

namespace Web.Controllers
{

  public class AccountController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateAccount([FromBody] CreateAccountCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<List<AccountDto>>> GetAllAccounts()
    {
      return await Mediator.Send(new GetAccountsQuery());
    }

    [HttpGet("myAccount")]
    public async Task<ActionResult<AccountDto>> GetAccount()
    {
      return await Mediator.Send(new GetCurrentAccountQuery());
    }
  }
}
