using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AddressConfiguration : IEntityTypeConfiguration<Address>
  {
    public void Configure(EntityTypeBuilder<Address> builder)
    {
      builder.HasOne<Client>(e => e.Client)
        .WithOne(e => e.Address)
        .HasForeignKey<Client>(e => e.AddressId)
        .IsRequired();
    }
  }
}
