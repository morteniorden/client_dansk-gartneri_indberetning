using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Enums;
using MediatR;

namespace Application.Mails.Commands.GeneratePreviewMailCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GeneratePreviewMailCommand : IRequest<string>
  {
    public EmailDto EmailDto { get; set; }
    public class GeneratePreviewMailCommandHandler : IRequestHandler<GeneratePreviewMailCommand, string>
    {
      private readonly IMailService _mailService;

      public GeneratePreviewMailCommandHandler(IMailService mailService)
      {
        _mailService = mailService;
      }

      public async Task<string> Handle(GeneratePreviewMailCommand request, CancellationToken cancellationToken)
      {
        return await _mailService.GeneratePreview(request.EmailDto);
      }
    }
  }
}
