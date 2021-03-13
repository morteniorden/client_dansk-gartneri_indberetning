using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Newtonsoft.Json;

namespace Application.Users.Commands.UpdatePassword
{
  [Authorize]
  public class UpdatePasswordCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public UpdatePasswordDto PasswordDto { get; set; }


    public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public UpdatePasswordCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<Unit> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
      {
        if (request.Id != int.Parse(_currentUserService.UserId))
        {
          throw new UnauthorizedAccessException("The request id did not match the currently authorized user.");
        }

        var userEntity = await _context.Users.FindAsync(request.Id);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), request.Id);
        }

        userEntity.Password = request.PasswordDto.Password;

        _context.Users.Update(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
