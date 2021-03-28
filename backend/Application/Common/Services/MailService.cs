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
using RazorEmails.Views.Emails.CtaButtonEmail;

namespace Application.Common.Services
{
  public class MailService : IMailService
  {
    private readonly MailOptions _mailOptions;
    private readonly IRazorViewToStringRenderer _razorViewToStringRenderer;
    private readonly IApplicationDbContext _context;
    public MailService(IOptions<MailOptions> mailOptions, IRazorViewToStringRenderer razorViewToStringRenderer, IApplicationDbContext context)
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
      var emailModel = new CtaButtonEmailViewModel()
      {
        HtmlContent = "<h2>Lorem</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.</p>",
        CtaButtonText = "Lorem ipsum",
        CtaButtonUrl = "http://danskgartneri.dk"
      };
      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.DevelopmentRecipient,
        Subject = "Test mail from Dansk Gartneri",
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CtaButtonEmail/CtaButtonEmail.cshtml", emailModel)
      };

      await SendEmailAsync(mail);
    }

    public async Task SendUserActivationEmail(string email, string token, string baseUrl)
    {
      var emailEntity = _context.Emails.Find(1);

      var emailModel = new CtaButtonEmailViewModel()
      {
        HtmlContent = emailEntity.HtmlContent,
        CtaButtonText = emailEntity.CtaButtonText,
        CtaButtonUrl = baseUrl + "/api/auth/resetPassword?token=" + token
      };
      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.DevelopmentRecipient ?? email,
        Subject = emailEntity.Subject,
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CtaButtonEmail/CtaButtonEmail.cshtml", emailModel)
      };
      await SendEmailAsync(mail);
    }

    public async Task SendForgotPasswordEmail(string email, string token, string baseUrl)
    {
      var emailEntity = _context.Emails.Find(2);

      var emailModel = new CtaButtonEmailViewModel()
      {
        HtmlContent = emailEntity.HtmlContent,
        CtaButtonText = emailEntity.CtaButtonText,
        CtaButtonUrl = baseUrl + "/api/auth/resetPassword?token=" + token
      };
      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.DevelopmentRecipient ?? email,
        Subject = emailEntity.Subject,
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CtaButtonEmail/CtaButtonEmail.cshtml", emailModel)
      };
      await SendEmailAsync(mail);
    }

    public async Task<string> GeneratePreview(EmailDto emailDto)
    {
      var emailModel = new CtaButtonEmailViewModel()
      {
        HtmlContent = emailDto.HtmlContent,
        CtaButtonText = emailDto.CtaButtonText,
      };

      var htmlString = await _razorViewToStringRenderer.RenderViewToStringAsync(
        "/Views/Emails/CtaButtonEmail/CtaButtonEmail.cshtml", emailModel);

      var hostedLogo = _mailOptions.baseUrl + "/images/logo.png";
      var hostedAltLogo = _mailOptions.baseUrl + "/images/altlogo.png";

      var imgReplacedHtml = htmlString
        .Replace("cid:Logo", hostedLogo)
        .Replace("cid:altLogo", hostedAltLogo);

      return imgReplacedHtml;
    }
  }
}
