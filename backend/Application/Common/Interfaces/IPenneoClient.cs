using Application.Statements;

namespace Application.Common.Interfaces
{
  public interface IPenneoClient
  {
    void StartConnection();
    string SignDoc(StandardSignDTO dto);
  }
}
