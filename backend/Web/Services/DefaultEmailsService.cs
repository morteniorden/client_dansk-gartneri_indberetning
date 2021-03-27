using Application.Common.Interfaces;
using Domain.Entities;

namespace Web.Services
{
  public class DefaultEmailsService
  {
    private readonly IApplicationDbContext _context;

    public DefaultEmailsService(IApplicationDbContext context)
    {
      _context = context;
    }

    public void SetupDefaultEmails()
    {
      var inviteEmail = _context.Emails
        .Find(1);

      if (inviteEmail == null)
      {
        inviteEmail = new Email
        {
          Name = "Invitationsmail",
          Title = "Velkommen til Dansk Gartneri indeberetningssystem",
          HtmlContent =
            "<h2>Velkommen til Dansk Gartneri indeberetningssystem</h2><p>Du er blevet inviteret til at indberette din omsætning gennem vores system. Klik herunder for at aktivere din bruger i systemet.</p>",
          CtaButtonText = "Aktiver din bruger"
        };
        _context.Emails.Add(inviteEmail);
      }

      var forgotPasswordEmail = _context.Emails
        .Find(2);

      if (forgotPasswordEmail == null)
      {
        forgotPasswordEmail = new Email
        {
          Name = "Glemt password email",
          Title = "Reset dit password til Dansk Gartneri",
          HtmlContent =
            "<h2>Reset dit password</h2><p>Du har modtaget denne mail, da du har anmodet om at resette dit password. Klik herunder for at gå til siden og vælge et nyt password.</p>",
          CtaButtonText = "Vælg nyt password"
        };
        _context.Emails.Add(forgotPasswordEmail);
      }

      _context.SaveChanges();
    }
  }

}
