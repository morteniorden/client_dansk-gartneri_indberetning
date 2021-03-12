using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;

namespace Application.Users.Commands.UpdatePassword
{
  [Authorize]
  public class UpdatePasswordCommand : IRequest
  {
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
        var userEntity = await _context.Users.FindAsync(_currentUserService.UserId);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), _currentUserService.UserId);
        }

        userEntity.Password = request.PasswordDto.Password;

        _context.Users.Update(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
