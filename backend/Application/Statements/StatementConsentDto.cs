using Microsoft.AspNetCore.Http;

namespace Application.Statements
{
  public class StatementConsentDto
  {
    public int StatementId { get; set; }
    public IFormFile File { get; set; }
  }
}
