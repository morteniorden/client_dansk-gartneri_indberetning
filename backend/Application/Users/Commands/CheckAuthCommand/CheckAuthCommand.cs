using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.CheckAuthCommand
{
  [Authenticated]
  public class CheckAuthCommand : IRequest<UserDto>
  {
    public class CheckAuthCommandHandler : IRequestHandler<CheckAuthCommand, UserDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _userAuthService;
      private readonly IMapper _mapper;


      public CheckAuthCommandHandler(IApplicationDbContext context, ICurrentUserService userAuthService, IMapper mapper)
      {
        _context = context;
        _userAuthService = userAuthService;
        _mapper = mapper;
      }

      public async Task<UserDto> Handle(CheckAuthCommand request, CancellationToken cancellationToken)
      {

        User user = await _context.Users
          .FirstOrDefaultAsync(x => x.Email.Equals(_userAuthService.UserId));

        if (user == null)
        {
          // throw 401??
          throw new ArgumentException("Invalid credentials.");
        }

        if (user.DeactivationTime != null)
        {
          throw new ArgumentException("This user is deactivated.");
        }

        return _mapper.Map<UserDto>(user);
      }
    }
  }
}
