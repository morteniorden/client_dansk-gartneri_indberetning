using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class Statements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Statements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    RevisionYear = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    s1_mushrooms = table.Column<int>(type: "int", nullable: false),
                    s1_tomatoCucumberHerb = table.Column<int>(type: "int", nullable: false),
                    s1_boughtPlants = table.Column<int>(type: "int", nullable: false),
                    s3_carrots = table.Column<int>(type: "int", nullable: false),
                    s3_peas = table.Column<int>(type: "int", nullable: false),
                    s3_onions = table.Column<int>(type: "int", nullable: false),
                    s3_other = table.Column<int>(type: "int", nullable: false),
                    s3_boughtPlants = table.Column<int>(type: "int", nullable: false),
                    s4_onions = table.Column<int>(type: "int", nullable: false),
                    s4_plants = table.Column<int>(type: "int", nullable: false),
                    s4_cutFlowers = table.Column<int>(type: "int", nullable: false),
                    s4_boughtPlants = table.Column<int>(type: "int", nullable: false),
                    s7_plants = table.Column<int>(type: "int", nullable: false),
                    s7_boughtPlants = table.Column<int>(type: "int", nullable: false),
                    s8_applesPearsEtc = table.Column<int>(type: "int", nullable: false),
                    s8_packaging = table.Column<int>(type: "int", nullable: false),
                    s8_cherries = table.Column<int>(type: "int", nullable: false),
                    s8_plums = table.Column<int>(type: "int", nullable: false),
                    s8_otherStoneFruit = table.Column<int>(type: "int", nullable: false),
                    s8_currant = table.Column<int>(type: "int", nullable: false),
                    s8_strawberries = table.Column<int>(type: "int", nullable: false),
                    s8_otherBerryFruit = table.Column<int>(type: "int", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Statements_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Statements_AccountId_RevisionYear",
                table: "Statements",
                columns: new[] { "ClientId", "AccountingYear" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Statements");
        }
    }
}
