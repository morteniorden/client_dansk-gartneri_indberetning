using System.Collections.Generic;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Statement : AuditableEntity
  {
    public int Id { get; set; }
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }
    public int RevisionYear { get; set; }
    public StatementStatus Status { get; set; }
    public StatementApprovalStatus ApprovalStatus { get; set; }

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
