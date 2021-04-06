using Domain.Common;

namespace Domain.Entities
{
  public class Email : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Subject { get; set; }
    public string Heading1 { get; set; }
    public string Paragraph1 { get; set; }
    public string Heading2 { get; set; }
    public string Paragraph2 { get; set; }
    public string Heading3 { get; set; }
    public string Paragraph3 { get; set; }
    public string CtaButtonText { get; set; }
  }
}
