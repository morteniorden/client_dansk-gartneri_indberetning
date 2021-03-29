using System.Linq;
using Domain.Entities;
using Domain.Enums;

namespace Domain.EntityExtensions
{
  public static class AccountExtensions
  {
    public static User GetClient(this Account account)
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
    public static User GetActiveAccountant(this Account account)
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
  }
}
