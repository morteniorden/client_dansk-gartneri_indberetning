using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.ExampleChildren;
using Domain.Entities;
using Hangfire;
using MediatR;

namespace Application.Mails.Commands.GeneratePreviewMailCommand
{
  public class GeneratePreviewMailCommand : IRequest<string>
  {
    public string BodyContent { get; set; }
    public class GeneratePreviewMailCommandHandler : IRequestHandler<GeneratePreviewMailCommand, string>
    {
      private readonly IMailService _mailService;

      public GeneratePreviewMailCommandHandler(IMailService mailService)
      {
        _mailService = mailService;
      }

      public async Task<string> Handle(GeneratePreviewMailCommand request, CancellationToken cancellationToken)
      {
        return await _mailService.GeneratePreview(request.BodyContent);
      }
    }
  }
}
