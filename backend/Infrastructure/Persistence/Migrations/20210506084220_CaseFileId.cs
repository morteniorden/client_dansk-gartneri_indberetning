using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class CaseFileId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccountantCaseFileId",
                table: "Statements",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientCaseFileId",
                table: "Statements",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountantCaseFileId",
                table: "Statements");

            migrationBuilder.DropColumn(
                name: "ClientCaseFileId",
                table: "Statements");
        }
    }
}
