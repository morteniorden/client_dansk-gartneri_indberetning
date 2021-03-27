using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class EmailConfiguration : IEntityTypeConfiguration<Email>
  {
    public void Configure(EntityTypeBuilder<Email> builder)
    {
      builder.Property(e => e.Name)
        .HasMaxLength(200);
      builder.Property(e => e.Title)
        .HasMaxLength(200);
      builder.Property(e => e.CtaButtonText)
        .HasMaxLength(200);
    }
  }
}
