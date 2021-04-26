using Domain.Entities;

namespace Domain.EntityExtensions
{
  public static class StatementExtensions
  {
    public static int GetTotal(this Statement statement)
    {
      return
        statement.s1_boughtPlants +
        statement.s1_mushrooms +
        statement.s1_tomatoCucumberHerb +
        statement.s3_boughtPlants +
        statement.s3_carrots +
        statement.s3_onions +
        statement.s3_other +
        statement.s3_peas +
        statement.s4_boughtPlants +
        statement.s4_cutFlowers +
        statement.s4_onions +
        statement.s4_plants +
        statement.s7_boughtPlants +
        statement.s7_plants +
        statement.s8_applesPearsEtc +
        statement.s8_cherries +
        statement.s8_currant +
        statement.s8_otherBerryFruit +
        statement.s8_otherStoneFruit +
        statement.s8_packaging +
        statement.s8_plums +
        statement.s8_strawberries;
    }
  }
}
