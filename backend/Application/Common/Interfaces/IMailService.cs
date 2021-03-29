using System.Threading.Tasks;
using Application.Mails;

namespace Application.Common.Interfaces
{
  public interface IMailService
  {
    Task SendEmailAsync(MailRequestDto mailRequest);
    Task TestSendEmail();
    Task SendUserActivationEmail(string email, string token);
    Task SendForgotPasswordEmail(string email, string token);
    Task<string> GeneratePreview(EmailDto emailDto);
  }
}
