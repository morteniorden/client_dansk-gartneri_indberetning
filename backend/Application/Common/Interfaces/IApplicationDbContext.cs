using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
  public interface IApplicationDbContext
  {

    DbSet<Account> Accounts { get; set; }
    DbSet<User> Users { get; set; }
    DbSet<AdminUser> Admins { get; set; }
    DbSet<Address> Addresses { get; set; }
    DbSet<Email> Emails { get; set; }
    DbSet<ExampleChild> ExampleChildren { get; set; }
    DbSet<ExampleParent> ExampleParents { get; set; }

    int SaveChanges();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}
