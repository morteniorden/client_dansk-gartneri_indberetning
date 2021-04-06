using Application.Common.Interfaces;
using Application.Common.Options;
using Domain.Entities;
using Microsoft.Extensions.Options;

namespace Web.Services
{
  public class DefaultEmailsService
  {
    private readonly IApplicationDbContext _context;
    private readonly MailOptions _options;

    public DefaultEmailsService(IApplicationDbContext context, IOptions<MailOptions> options)
    {
      _context = context;
      _options = options.Value;
    }

    public void SetupDefaultEmails()
    {
      foreach (var email in _options.DefaultEmails)
      {
        var emailEntity = _context.Emails
          .Find(email.Id);

        if (emailEntity == null)
        {
          emailEntity = new Email
          {
            Name = email.Name,
            Subject = email.Subject,
            Heading1 = email.Heading1,
            Paragraph1 = email.Paragraph1,
            Heading2 = email.Heading2,
            Paragraph2 = email.Paragraph2,
            Heading3 = email.Heading3,
            Paragraph3 = email.Paragraph3,
            CtaButtonText = email.CtaButtonText
          };
          _context.Emails.Add(emailEntity);
        }
      }

      _context.SaveChanges();
    }
  }

}
