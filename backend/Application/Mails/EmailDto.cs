using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Mails
{
  public class EmailDto : IAutoMap<Email>
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
