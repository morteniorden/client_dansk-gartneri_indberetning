using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class StatementConfiguration : IEntityTypeConfiguration<Statement>
  {
    public void Configure(EntityTypeBuilder<Statement> builder)
    {
      builder.HasOne<Client>(e => e.Client)
        .WithMany(e => e.Statements)
        .HasForeignKey(e => e.ClientId)
        .IsRequired(true);

      builder.HasOne<Accountant>(e => e.Accountant)
        .WithMany(e => e.Statements)
        .HasForeignKey(e => e.AccountantId)
        .IsRequired(false);

      builder.Property(e => e.Status)
        .IsRequired(true);

      builder.Property(e => e.AccountingYear)
        .IsRequired(true);

      builder.HasIndex(e => new {e.ClientId, e.AccountingYear}).IsUnique();
    }
  }
}
/*
       builder.HasOne<Client>(e => e.Client)
        .WithMany(e => e.Statements)
        .HasForeignKey(e => e.ClientId)
        .IsRequired(true);

      builder.HasOne<Accountant>(e => e.Accountant)
        .WithMany(e => e.Statements)
        .HasForeignKey(e => e.AccountantId)
        .IsRequired(false);

      builder.Property(e => e.Status)
        .IsRequired(true);

      builder.Property(e => e.AccountingYear)
        .IsRequired(true);

      builder.HasIndex(e => new {ClientId = e.ClientId, AccountingYear = e.AccountingYear}).IsUnique();
 */
