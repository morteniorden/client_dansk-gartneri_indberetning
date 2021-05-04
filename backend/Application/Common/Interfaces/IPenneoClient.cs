using Application.Statements;

namespace Application.Common.Interfaces
{
  public interface ISigningClient
  {
    void StartConnection();
    string SignDoc(StandardSignDTO dto);
  }
}
