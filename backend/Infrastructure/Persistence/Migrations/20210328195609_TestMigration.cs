using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class TestMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ctaButtonText",
                table: "Emails",
                newName: "CtaButtonText");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Emails",
                newName: "Subject");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CtaButtonText",
                table: "Emails",
                newName: "ctaButtonText");

            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "Emails",
                newName: "Title");
        }
    }
}
