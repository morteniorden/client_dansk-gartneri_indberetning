using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;
using Newtonsoft.Json;

namespace Application.Users.Commands.UpdatePassword
{
  [Authenticated]
  public class UpdatePasswordCommand : IRequest
  {
    public string NewPassword { get; set; }

    public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;
      private readonly IPasswordHasher _passwordHasher;

      public UpdatePasswordCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IPasswordHasher passwordHasher)
      {
        _context = context;
        _currentUserService = currentUserService;
        _passwordHasher = passwordHasher;
      }

      public async Task<Unit> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
      {
        var id = int.Parse(_currentUserService.UserId);

        var userEntity = await _context.Users.FindAsync(id);

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), id);
        }

        userEntity.Password = _passwordHasher.Hash(request.NewPassword);

        _context.Users.Update(userEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
