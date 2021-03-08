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
    DbSet<Address> Addresses { get; set; }
    DbSet<ExampleChild> ExampleChildren { get; set; }
    DbSet<ExampleParent> ExampleParents { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}
