using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Security;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.Extensions.Options;
using Web.Options;

namespace Web.Services
{
  public class SuperAdminService
  {
    private readonly IApplicationDbContext _context;
    private readonly SuperUserOptions _options;
    private readonly HashingOptions _hashingOptions;
    private readonly IPasswordHasher _passwordHasher;

    public SuperAdminService(IApplicationDbContext context, IOptions<SuperUserOptions> options, IOptions<HashingOptions> hashingOptions, IPasswordHasher passwordHasher)
    {
      _context = context;
      _options = options.Value;
      _hashingOptions = hashingOptions.Value;

      _passwordHasher = passwordHasher;
    }

    public void SetupSuperUser()
    {

      var email = _options.Username.ToLower();
      var pass = _passwordHasher.Hash(_options.Password);

      if (email == "") return;

      var superUser = _context.Admins
        .Where(x => x.Email.Equals(email))
        .FirstOrDefault();

      if (superUser == null)
      {
        superUser = new AdminUser
        {
          Name = "SuperAdmin",
          Email = email,
          Password = pass
        };
        _context.Admins.Add(superUser);
      } else
      {
        superUser.Password = pass;
        _context.Admins.Update(superUser);
      }

      _context.SaveChanges();
    }
  }

}
