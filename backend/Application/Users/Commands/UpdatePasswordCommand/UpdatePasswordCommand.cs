using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
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
        IUser userEntity = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUserService.UserId);

        if (userEntity == null)
        {
          userEntity = await _context.Admins.FirstOrDefaultAsync(x => x.Email == _currentUserService.UserId);
        }

        if (userEntity == null)
        {
          throw new NotFoundException(nameof(User), _currentUserService.UserId);
        }

        userEntity.Password = _passwordHasher.Hash(request.NewPassword);

        if (userEntity.Role == RoleEnum.Admin)
        {
          _context.Admins.Update((AdminUser) userEntity);
        } else
        {
          _context.Users.Update((User) userEntity);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
