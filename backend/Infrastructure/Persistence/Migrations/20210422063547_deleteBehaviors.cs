using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class deleteBehaviors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statements_Users_AccountantId",
                table: "Statements");

            migrationBuilder.AddForeignKey(
                name: "FK_Statements_Users_AccountantId",
                table: "Statements",
                column: "AccountantId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Statements_Users_AccountantId",
                table: "Statements");

            migrationBuilder.AddForeignKey(
                name: "FK_Statements_Users_AccountantId",
                table: "Statements",
                column: "AccountantId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
