using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Application.Users;

namespace Application.Accounts.Commands.CreateAdmin
{
  [Authorize(Role = RoleEnum.Admin)]
  public class CreateAdminCommand : IRequest<int>
  {
    public CreateAdminDto Admin;

    public class CreateAdminCommandHandler : IRequestHandler<CreateAdminCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly IPasswordHasher _passwordHasher;

      public CreateAdminCommandHandler(IApplicationDbContext context, IPasswordHasher passwordHasher)
      {
        _context = context;
        _passwordHasher = passwordHasher;
      }

      public async Task<int> Handle(CreateAdminCommand request, CancellationToken cancellationToken)
      {
        var userEntity = new Admin
        {
          Email = request.Admin.Email,
          Password = _passwordHasher.Hash(request.Admin.Password),
          Name = request.Admin.Name
        };

        _context.Users.Add(userEntity);
        await _context.SaveChangesAsync(cancellationToken);
      
        return userEntity.Id;
      }
    }
  }
}
