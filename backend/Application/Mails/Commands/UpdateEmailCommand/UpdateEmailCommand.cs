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
        emailEntity.HtmlContent = request.NewEmail.HtmlContent;
        emailEntity.CtaButtonText = request.NewEmail.CtaButtonText;

        _context.Emails.Update(emailEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
