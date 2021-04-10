using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class StatementConfiguration : IEntityTypeConfiguration<Statement>
  {
    public void Configure(EntityTypeBuilder<Statement> builder)
    {
      builder.HasOne<Account>(e => e.Account)
        .WithMany(e => e.Statements)
        .HasForeignKey(e => e.AccountId)
        .IsRequired(true);

      builder.Property(e => e.Status)
        .IsRequired(true);

      builder.Property(e => e.RevisionYear)
        .IsRequired(true);

      builder.HasIndex(e => new {e.AccountId, e.RevisionYear}).IsUnique();
    }
  }
}
