using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class UserConfiguration : IEntityTypeConfiguration<User>
  {
    public void Configure(EntityTypeBuilder<User> builder)
    {
      builder.ToTable("Users");

      builder.HasDiscriminator<RoleEnum>("Role")
        .HasValue<Admin>(RoleEnum.Admin)
        .HasValue<Accountant>(RoleEnum.Accountant)
        .HasValue<Client>(RoleEnum.Client);

      builder.Property(e => e.Name)
        .HasMaxLength(200)
        .IsRequired();

      builder.Property(e => e.Email)
        .IsRequired();

      builder.HasIndex(e => e.Email)
        .IsUnique();

      builder.Property(e => e.Role)
        .IsRequired();
    }
  }
}
