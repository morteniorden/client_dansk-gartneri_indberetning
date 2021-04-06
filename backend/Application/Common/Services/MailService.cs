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
        Heading1 = "Lorem",
        paragraph1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.",
        Heading2 = "Lorem",
        paragraph2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.",
        Heading3 = "Lorem",
        paragraph3 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus adipiscing felis, sit amet blandit ipsum volutpat sed. Morbi porttitor, eget accumsan dictum, nisi libero ultricies ipsum, in posuere mauris neque at erat.",
        CtaButtonText = "Lorem ipsum",
        CtaButtonUrl = "http://danskgartneri.dk"
      };
      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.Mail,
        Subject = "Test mail from Dansk Gartneri",
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CtaButtonEmail/CtaButtonEmail.cshtml", emailModel)
      };

      await SendEmailAsync(mail);
    }

    public async Task SendUserActivationEmail(string email, string token)
    {
      var emailEntity = _context.Emails.Find(1);

      var emailModel = new CtaButtonEmailViewModel()
      {
        Heading1 = emailEntity.Heading1,
        paragraph1 = emailEntity.Paragraph1,
        Heading2 = emailEntity.Heading2,
        paragraph2 = emailEntity.Paragraph2,
        Heading3 = emailEntity.Heading3,
        paragraph3 = emailEntity.Paragraph3,
        CtaButtonText = emailEntity.CtaButtonText,
        CtaButtonUrl = _mailOptions.baseUrl + "/changepassword?token=" + token
      };
      var mail = new MailRequestDto
      {
        ToEmail = email,
        Subject = emailEntity.Subject,
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CtaButtonEmail/CtaButtonEmail.cshtml", emailModel)
      };
      await SendEmailAsync(mail);
    }

    public async Task SendForgotPasswordEmail(string email, string token)
    {
      var emailEntity = _context.Emails.Find(2);

      var emailModel = new CtaButtonEmailViewModel()
      {
        Heading1 = emailEntity.Heading1,
        paragraph1 = emailEntity.Paragraph1,
        Heading2 = emailEntity.Heading2,
        paragraph2 = emailEntity.Paragraph2,
        Heading3 = emailEntity.Heading3,
        paragraph3 = emailEntity.Paragraph3,
        CtaButtonText = emailEntity.CtaButtonText,
        CtaButtonUrl = _mailOptions.baseUrl + "/changepassword?token=" + token
      };
      var mail = new MailRequestDto
      {
        ToEmail = email,
        Subject = emailEntity.Subject,
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/CtaButtonEmail/CtaButtonEmail.cshtml", emailModel)
      };
      await SendEmailAsync(mail);
    }

    public async Task<string> GeneratePreview(EmailDto emailDto)
    {
      var emailModel = new CtaButtonEmailViewModel()
      {
        Heading1 = emailDto.Heading1,
        paragraph1 = emailDto.Paragraph1,
        Heading2 = emailDto.Heading2,
        paragraph2 = emailDto.Paragraph2,
        Heading3 = emailDto.Heading3,
        paragraph3 = emailDto.Paragraph3,
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
