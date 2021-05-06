using Application.Statements;

namespace Application.Common.Interfaces
{
  public interface IPenneoClient
  {
    void StartConnection();
    (string, int?) SignDoc(StandardSignDTO dto);
    bool IsCaseFileSigned(int id);
  }
}
