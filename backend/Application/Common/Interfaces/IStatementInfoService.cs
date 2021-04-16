using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
  public interface IStatementInfoService
  {
    Task CheckThisYearInfo(int year = -1);
  }
}
