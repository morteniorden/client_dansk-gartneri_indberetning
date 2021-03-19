using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Mails;
using Microsoft.Extensions.Options;

namespace Application.Common.Services
{
  public class MailService : IMailService
  {
    private readonly MailOptions _mailOptions;
    public MailService(IOptions<MailOptions> mailOptions)
    {
      _mailOptions = mailOptions.Value;
    }
    public async Task SendEmailAsync(MailRequestDto mailRequest)
    {
      MailAddress to = new MailAddress(mailRequest.ToEmail);
      MailAddress from = new MailAddress(_mailOptions.Mail);

      MailMessage message = new MailMessage(from, to);
      message.Subject = mailRequest.Subject;
      message.Body = mailRequest.Body;
      message.IsBodyHtml = true;
      AlternateView htmlView = AlternateView.CreateAlternateViewFromString(mailRequest.Body, null, "text/html");

      //Add two logo images as attached resources to mails.
      LinkedResource logoResource = new LinkedResource("./Resources/logo.png");
      LinkedResource altLogoResource = new LinkedResource("./Resources/logo_alt.png");
      logoResource.ContentId = "logo";
      altLogoResource.ContentId = "altLogo";
      htmlView.LinkedResources.Add(logoResource);
      htmlView.LinkedResources.Add(altLogoResource);

      message.AlternateViews.Add(htmlView);

      SmtpClient client = new SmtpClient(_mailOptions.Host, _mailOptions.Port)
      {
        Credentials = new NetworkCredential(_mailOptions.Username, _mailOptions.Password),
        EnableSsl = true
      };

      try
      {
        client.Send(message);
      }
      catch (SmtpException ex)
      {
        Console.WriteLine(ex.ToString());
      }
    }

    public async Task TestSendEmail()
    {
      var mail = new MailRequestDto
      {
        ToEmail = "4aa05eab54-030844@inbox.mailtrap.io", //Mailtrap inbox
        Subject = "Test mail from Dansk Gartneri",
        Body = "<img src=cid:logo><p>Hello world from mailService</p><img src=cid:altLogo>"
      };

      await SendEmailAsync(mail);
    }
  }
}
