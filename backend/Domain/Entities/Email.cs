using Domain.Common;

namespace Domain.Entities
{
  public class Email : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Subject { get; set; }
    public string HtmlContent { get; set; }
    public string CtaButtonText { get; set; }
  }
}
