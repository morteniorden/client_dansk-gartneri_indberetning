using System.Linq;
using Domain.Entities;
using Domain.Enums;

namespace Domain.EntityExtensions
{
  public static class AccountExtensions
  {
    /*
    public static Client GetClient(this Account account)
    {
      try
      {
        var user = account.Users.First(u => u.Role == RoleEnum.Client && u.DeactivationTime == null);
        return user;
      } catch
      {
        return null;
      }
    }
    public static Client GetActiveAccountant(this Account account)
    {
      try
      {
        var user = account.Users.First(u => u.Role == RoleEnum.Accountant && u.DeactivationTime == null);
        return user;
      }
      catch
      {
        return null;
      }
    }
    */
  }
}
