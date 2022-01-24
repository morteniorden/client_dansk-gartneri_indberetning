
using System.IO;

namespace Application.Statements
{
  public class StatementFileDto
  {
    public string FileName { get; set; }
    public FileStream Data { get; set; }
  }
}
