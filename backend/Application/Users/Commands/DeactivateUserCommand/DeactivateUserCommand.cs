using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Enums;
using MediatR;
using Newtonsoft.Json;

namespace Application.Users.Commands.DeactivateUserCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class DeactivateUserCommand : IRequest
  {
    public int Id { get; set; }

    public class DeactivateUserCommandHandler : IRequestHandler<DeactivateUserCommand>
    {
      private readonly IApplicationDbContext _context;

      public DeactivateUserCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(DeactivateUserCommand request, CancellationToken cancellationToken)
      {
        var userEntity = await _context.Users.FindAsync(request.Id);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.User), request.Id);
        }

        userEntity.DeactivationTime = DateTimeOffset.Now;

        _context.Users.Update(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
