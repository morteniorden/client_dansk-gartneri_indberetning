using System.Threading.Tasks;
using Application.Mails;

namespace Application.Common.Interfaces
{
  public interface IMailService
  {
    Task SendEmailAsync(MailRequestDto mailRequest);
    Task TestSendEmail();
    Task SendUserActivationEmail(string email, string token, string baseUrl);
    Task SendForgotPasswordEmail(string email, string token, string baseUrl);
    Task<string> GeneratePreview(string content);
  }
}
