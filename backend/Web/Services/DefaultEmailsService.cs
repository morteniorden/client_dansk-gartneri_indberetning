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
            HtmlContent = email.HtmlContent,
            CtaButtonText = email.CtaButtonText
          };
          _context.Emails.Add(emailEntity);
        }
      }

      _context.SaveChanges();
    }
  }

}
