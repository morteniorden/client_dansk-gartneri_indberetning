using Application.Common.Mappings;
using Application.Users;
using Domain.Entities;
using Domain.Enums;

namespace Application.Statements
{
  public class StatementDto : IAutoMap<Statement>
  {
    public int Id { get; set; }
    public int ClientId { get; set; }
    public virtual ClientNoStatementsDto Client { get; set; }
    public int? AccountantId { get; set; }
    public virtual Accountant? Accountant { get; set; }
    public AccountantType AccountantType { get; set; }
    public int AccountingYear { get; set; }
    public StatementStatus Status { get; set; }
    public bool IsApproved { get; set; }
    public int? ClientCaseFileId { get; set; }
    public int? AccountantCaseFileId { get; set; }
    public string StatementFileName { get; set; }

    public int s1_mushrooms { get; set; }
    public int s1_tomatoCucumberHerb { get; set; }
    public int s1_boughtPlants { get; set; }

    public int s3_carrots { get; set; }
    public int s3_peas { get; set; }
    public int s3_onions { get; set; }
    public int s3_other { get; set; }
    public int s3_boughtPlants { get; set; }

    public int s4_onions { get; set; }
    public int s4_plants { get; set; }
    public int s4_cutFlowers { get; set; }
    public int s4_boughtPlants { get; set; }

    public int s7_plants { get; set; }
    public int s7_boughtPlants { get; set; }

    public int s8_applesPearsEtc { get; set; }
    public int s8_packaging { get; set; }
    public int s8_cherries { get; set; }
    public int s8_plums { get; set; }
    public int s8_otherStoneFruit { get; set; }
    public int s8_currant { get; set; }
    public int s8_strawberries { get; set; }
    public int s8_otherBerryFruit { get; set; }
  }
}
