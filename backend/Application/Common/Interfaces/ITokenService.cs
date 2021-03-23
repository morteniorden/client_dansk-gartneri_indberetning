using System.Threading.Tasks;
using Domain.Entities;
namespace Application.Common.Interfaces
{
  public interface ITokenService
  {
    string CreateToken(IUser user);
    Task<(string, string)> CreateSSOToken(IUser user);
    Task<int> ValidateSSOToken(string token);
  }
}
