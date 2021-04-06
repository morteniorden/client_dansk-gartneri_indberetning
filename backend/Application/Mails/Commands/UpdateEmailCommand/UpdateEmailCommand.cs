using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;

namespace Application.Mails.Commands.UpdateEmailCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class UpdateEmailCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public EmailDto NewEmail { get; set; }


    public class UpdateEmailCommandHandler : IRequestHandler<UpdateEmailCommand>
    {
      private readonly IApplicationDbContext _context;

      public UpdateEmailCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(UpdateEmailCommand request, CancellationToken cancellationToken)
      {
        var emailEntity = await _context.Emails.FindAsync(request.Id);

        if (emailEntity == null)
        {
          throw new NotFoundException(nameof(Email), request.Id);
        }

        emailEntity.Name = request.NewEmail.Name;
        emailEntity.Subject = request.NewEmail.Subject;
        emailEntity.Heading1 = request.NewEmail.Heading1;
        emailEntity.Paragraph1 = request.NewEmail.Paragraph1;
        emailEntity.Heading2 = request.NewEmail.Heading2;
        emailEntity.Paragraph2 = request.NewEmail.Paragraph2;
        emailEntity.Heading3 = request.NewEmail.Heading3;
        emailEntity.Paragraph3 = request.NewEmail.Paragraph3;
        emailEntity.CtaButtonText = request.NewEmail.CtaButtonText;

        _context.Emails.Update(emailEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
