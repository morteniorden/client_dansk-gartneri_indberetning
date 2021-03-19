using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.ExampleChildren;
using Domain.Entities;
using Hangfire;
using MediatR;

namespace Application.Mails.Commands.SendTestMailCommand
{
  public class SendTestMailCommand : IRequest
  {
    public class SendTestMailCommandHandler : IRequestHandler<SendTestMailCommand>
    {
      private readonly IMailService _mailService;

      public SendTestMailCommandHandler(IMailService mailService)
      {
        _mailService = mailService;
      }

      public async Task<Unit> Handle(SendTestMailCommand request, CancellationToken cancellationToken)
      {
        BackgroundJob.Enqueue(() => _mailService.TestSendEmail());

        return Unit.Value;
      }
    }
  }
}
