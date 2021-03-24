using System;
using System.Net;
using System.Net.Mail;
using System.Security.Policy;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Mails;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using RazorEmail.Services;
using RazorEmails.Interfaces;
using RazorEmails.Views.Emails.ActivateUserEmail;

namespace Application.Common.Services
{
  public class MailService : IMailService
  {
    private readonly MailOptions _mailOptions;
    private readonly IRazorViewToStringRenderer _razorViewToStringRenderer;
    private readonly IHttpContextAccessor _context;
    public MailService(IOptions<MailOptions> mailOptions, IRazorViewToStringRenderer razorViewToStringRenderer, IHttpContextAccessor context)
    {
      _mailOptions = mailOptions.Value;
      _razorViewToStringRenderer = razorViewToStringRenderer;
      _context = context;
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
      var activateUserModel = new ActivateUserEmailViewModel()
      {
        Header = "Header 1 here",
        Paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.",
        Url = "http://danskgartneri.dk"
      };
      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.DevelopmentRecipient,
        Subject = "Test mail from Dansk Gartneri",
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/ActivateUserEmail/ActivateUserEmail.cshtml", activateUserModel)
      };

      await SendEmailAsync(mail);
    }

    public async Task SendUserActivationEmail(string email, string token, string baseUrl)
    {
      var activateUserModel = new ActivateUserEmailViewModel()
      {
        Header = "Velkommen til Dansk Gartneri indeberetningssystem",
        Paragraph =
          "Du er blevet inviteret til systemet. Klik herunder for at aktivere din bruger og vælge dit password.",
        Url = baseUrl + "/api/auth/resetPassword?token=" + token
      };
      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.DevelopmentRecipient ?? email,
        Subject = "Velkommen til Dansk Gartneri indberetningssystem",
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/ActivateUserEmail/ActivateUserEmail.cshtml", activateUserModel)
      };
      await SendEmailAsync(mail);
    }
  }
}
