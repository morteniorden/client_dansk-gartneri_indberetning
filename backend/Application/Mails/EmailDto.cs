using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Mails
{
  public class EmailDto : IAutoMap<Email>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public string HtmlContent { get; set; }
    public string CtaButtonText { get; set; }
  }
}
