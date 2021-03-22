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

namespace Application.Users.Commands.UpdateUserCommand
{
  [Authorize(Role = RoleEnum.Admin)]
  public class UpdateUserCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public UserDto User { get; set; }


    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand>
    {
      private readonly IApplicationDbContext _context;

      public UpdateUserCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
      {
        var userEntity = await _context.Users.FindAsync(request.Id);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.User), request.Id);
        }

        if (_context.Accounts.Any(e => e.Email == request.User.Email) || _context.Users.Any(e => e.Email == request.User.Email && e.Id != request.User.Id))
        {
          throw new ArgumentException("The provided email address is already used by another user.");
        }

        userEntity.Name = request.User.Name ?? userEntity.Name;
        userEntity.Email = request.User.Email ?? userEntity.Email;

        _context.Users.Update(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
