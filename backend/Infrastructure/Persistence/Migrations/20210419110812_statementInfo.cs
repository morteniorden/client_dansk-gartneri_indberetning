using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class statementInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StatementInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountingYear = table.Column<int>(type: "int", nullable: false),
                    s1_mushrooms_permille = table.Column<float>(type: "real", nullable: false),
                    s1_mushrooms_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s1_tomatoCucumberHerb_permille = table.Column<float>(type: "real", nullable: false),
                    s1_tomatoCucumberHerb_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s1_boughtPlants_permille = table.Column<float>(type: "real", nullable: false),
                    s1_boughtPlants_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s3_carrots_permille = table.Column<float>(type: "real", nullable: false),
                    s3_carrots_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s3_peas_permille = table.Column<float>(type: "real", nullable: false),
                    s3_peas_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s3_onions_permille = table.Column<float>(type: "real", nullable: false),
                    s3_onions_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s3_other_permille = table.Column<float>(type: "real", nullable: false),
                    s3_other_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s3_boughtPlants_permille = table.Column<float>(type: "real", nullable: false),
                    s3_boughtPlants_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s4_onions_permille = table.Column<float>(type: "real", nullable: false),
                    s4_onions_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s4_plants_permille = table.Column<float>(type: "real", nullable: false),
                    s4_plants_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s4_cutFlowers_permille = table.Column<float>(type: "real", nullable: false),
                    s4_cutFlowers_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s4_boughtPlants_permille = table.Column<float>(type: "real", nullable: false),
                    s4_boughtPlants_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s7_plants_permille = table.Column<float>(type: "real", nullable: false),
                    s7_plants_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s7_boughtPlants_permille = table.Column<float>(type: "real", nullable: false),
                    s7_boughtPlants_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_applesPearsEtc_permille = table.Column<float>(type: "real", nullable: false),
                    s8_applesPearsEtc_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_packaging_permille = table.Column<float>(type: "real", nullable: false),
                    s8_packaging_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_cherries_permille = table.Column<float>(type: "real", nullable: false),
                    s8_cherries_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_plums_permille = table.Column<float>(type: "real", nullable: false),
                    s8_plums_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_otherStoneFruit_permille = table.Column<float>(type: "real", nullable: false),
                    s8_otherStoneFruit_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_currant_permille = table.Column<float>(type: "real", nullable: false),
                    s8_currant_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_strawberries_permille = table.Column<float>(type: "real", nullable: false),
                    s8_strawberries_help = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    s8_otherBerryFruit_permille = table.Column<float>(type: "real", nullable: false),
                    s8_otherBerryFruit_help = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatementInfo", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StatementInfo_AccountingYear",
                table: "StatementInfo",
                column: "AccountingYear",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StatementInfo");
        }
    }
}
