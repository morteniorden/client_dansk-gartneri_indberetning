using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AccountantConfiguration : IEntityTypeConfiguration<Accountant>
  {
    public void Configure(EntityTypeBuilder<Accountant> builder)
    {
      builder.HasMany<Statement>(e => e.Statements)
        .WithOne(e => e.Accountant)
        .HasForeignKey(e => e.AccountantId)
        .IsRequired(false)
        .OnDelete(DeleteBehavior.NoAction);
    }
  }
}
