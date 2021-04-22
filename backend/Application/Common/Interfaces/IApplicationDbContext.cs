using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
  public interface IApplicationDbContext
  {
    DbSet<User> Users { get; set; }
    DbSet<Client> Clients { get; set; }
    DbSet<Accountant> Accountants { get; set; }
    DbSet<Admin> Admins { get; set; }
    DbSet<Address> Addresses { get; set; }
    DbSet<Email> Emails { get; set; }
    DbSet<Statement> Statements { get; set; }
    DbSet<ExampleChild> ExampleChildren { get; set; }
    DbSet<ExampleParent> ExampleParents { get; set; }

    int SaveChanges();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}
