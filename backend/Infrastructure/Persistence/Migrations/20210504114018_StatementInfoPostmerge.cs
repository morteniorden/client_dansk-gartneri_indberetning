using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class StatementInfoPostmerge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountantType",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "AddressLine4",
                table: "Addresses",
                newName: "PostalCode");

            migrationBuilder.RenameColumn(
                name: "AddressLine3",
                table: "Addresses",
                newName: "OwnerName");

            migrationBuilder.RenameColumn(
                name: "AddressLine2",
                table: "Addresses",
                newName: "FirmName");

            migrationBuilder.RenameColumn(
                name: "AddressLine1",
                table: "Addresses",
                newName: "City");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Statements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "AddressAndPlace",
                table: "Addresses",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Statements");

            migrationBuilder.DropColumn(
                name: "AddressAndPlace",
                table: "Addresses");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "Addresses",
                newName: "AddressLine4");

            migrationBuilder.RenameColumn(
                name: "OwnerName",
                table: "Addresses",
                newName: "AddressLine3");

            migrationBuilder.RenameColumn(
                name: "FirmName",
                table: "Addresses",
                newName: "AddressLine2");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Addresses",
                newName: "AddressLine1");

            migrationBuilder.AddColumn<int>(
                name: "AccountantType",
                table: "Users",
                type: "int",
                nullable: true);
        }
    }
}
