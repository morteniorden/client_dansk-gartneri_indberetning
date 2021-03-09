using Domain.Enums;

namespace Application.Common.Interfaces
{
  public interface IAuthorizationService
  {

    bool IsInRole(RoleEnum role);

    bool HasPolicy(string policyName);
  }
}
