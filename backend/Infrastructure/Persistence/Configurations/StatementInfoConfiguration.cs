using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class StatementInfoConfiguration : IEntityTypeConfiguration<StatementInfo>
  {
    public void Configure(EntityTypeBuilder<StatementInfo> builder)
    {
      builder.Property(e => e.AccountingYear)
        .IsRequired(true);

      builder.HasIndex(e => e.AccountingYear).IsUnique();
    }
  }
}
