using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.UpdateUser
{
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
          throw new NotFoundException(nameof(User), request.Id);
        }


        //_context.ExampleChildren.Update(exampleEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
