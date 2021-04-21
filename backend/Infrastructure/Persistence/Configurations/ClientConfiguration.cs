using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ClientConfiguration : IEntityTypeConfiguration<Client>
  {
    public void Configure(EntityTypeBuilder<Client> builder)
    {
      builder.HasOne<Address>(e => e.Address)
        .WithOne(e => e.Client)
        .IsRequired()
        .OnDelete(DeleteBehavior.Cascade);

      builder.Property(e => e.CVRNumber)
        .IsRequired();

      builder.HasMany<Statement>(e => e.Statements)
        .WithOne(e => e.Client);
    }
  }
}
