using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        User userEntity = await _context.Users.FindAsync(request.Id);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.User), request.Id);
        }

        if (request.User.Email != null)
        {
          var checkExisting = await _context.Users.CountAsync(x => x.Email == request.User.Email);

          if (checkExisting > 0) {
            throw new ArgumentException("Email already in use");
          }
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
