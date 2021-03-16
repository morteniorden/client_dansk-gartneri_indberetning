using System;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Mails;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

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
      //To be implemented in DGI-49
      throw new NotImplementedException();
    }
  }
}
