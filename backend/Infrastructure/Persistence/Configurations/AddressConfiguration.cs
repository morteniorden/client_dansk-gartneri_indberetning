using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AddressConfiguration : IEntityTypeConfiguration<Address>
  {
    public void Configure(EntityTypeBuilder<Address> builder)
    {
      builder.HasOne<Account>(e => e.Account)
        .WithOne(e => e.Address)
        .HasForeignKey<Account>(e => e.Id)
        .IsRequired();
    }
  }
}
