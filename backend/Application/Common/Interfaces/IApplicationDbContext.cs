using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
  public interface IApplicationDbContext
  {
    DbSet<User> Users { get; set; }
    IQueryable<Client> Clients { get; }
    IQueryable<Accountant> Accountants { get; }
    IQueryable<Admin> Admins { get; }
    DbSet<Address> Addresses { get; set; }
    DbSet<Email> Emails { get; set; }
    DbSet<Statement> Statements { get; set; }

    int SaveChanges();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}
