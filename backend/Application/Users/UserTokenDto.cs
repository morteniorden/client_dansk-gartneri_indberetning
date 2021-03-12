using Application.Accounts;
using Application.Users;

namespace Application.Users
{
  public class UserTokenDto
  {
    public UserDto User { get; set; }
    public string Token { get; set; }
  }
}
