using System.Threading.Tasks;
using Domain.Entities;
namespace Application.Common.Interfaces
{
  public interface ITokenService
  {
    string CreateToken(User user);
    Task<(string, string)> CreateSSOToken(User user);
    Task<(string, string)> ValidateSSOToken(string token);
  }
}
