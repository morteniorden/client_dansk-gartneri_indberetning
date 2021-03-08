using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.HasKey(e => e.Id);

      builder.Property(e => e.Email)
        .IsRequired();

      builder.HasIndex(e => e.Email)
        .IsUnique();

      builder.Property(e => e.Role)
        .IsRequired();

      builder.Property(e => e.Name)
        .HasMaxLength(200)
        .IsRequired();

      builder.Property(e => e.AccountId)
        .IsRequired();

      builder.HasOne<Account>(e => e.Account)
        .WithMany(e => e.Users)
        .HasForeignKey(e => e.AccountId)
        .IsRequired(true);
    }
  }
}
