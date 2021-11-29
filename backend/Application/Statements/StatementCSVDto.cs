using Application.Common.Mappings;
using AutoMapper;
using CsvHelper.Configuration.Attributes;
using Domain.Entities;

namespace Application.Statements
{
  public class StatementCSVDto : IAutoMap<Statement>
  {
    [Name("Oplysningsskema-id")]
    public int Id { get; set; }
    [Name("Kunde-id")]
    public int ClientId { get; set; }
    [Name("Kunde")]
    public string ClientName { get; set; }
    [Name("CVR")]
    public string ClientCVR { get; set; }
    [Name("Revisor/Konsulent")]
    public string? AccountantName { get; set; }
    [Name("Revisionsår")]
    public int AccountingYear { get; set; }

    [Name("1. Svampe")]
    public int s1_mushrooms { get; set; }
    [Name("1. Tomat agurk krydderurt")]
    public int s1_tomatoCucumberHerb { get; set; }
    [Name("1. Indkøbte planter")]
    public int s1_boughtPlants { get; set; }

    [Name("3. Gulerod")]
    public int s3_carrots { get; set; }
    [Name("3. Ært")]
    public int s3_peas { get; set; }
    [Name("3. Løg")]
    public int s3_onions { get; set; }
    [Name("3. Andet")]
    public int s3_other { get; set; }
    [Name("3. Indkøbte planter")]
    public int s3_boughtPlants { get; set; }

    [Name("4. Løg og knolde")]
    public int s4_onions { get; set; }
    [Name("4. Potteplanter")]
    public int s4_plants { get; set; }
    [Name("4. Snitblomster")]
    public int s4_cutFlowers { get; set; }
    [Name("4. Indkøbte planter")]
    public int s4_boughtPlants { get; set; }

    [Name("7. Planteskoleplanter")]
    public int s7_plants { get; set; }
    [Name("7. Indkøbte planter")]
    public int s7_boughtPlants { get; set; }

    [Name("8. Æbler pærer m.v.")]
    public int s8_applesPearsEtc { get; set; }
    [Name("8. Emballage og salgsfragt")]
    public int s8_packaging { get; set; }
    [Name("8. Kirsebær")]
    public int s8_cherries { get; set; }
    [Name("8. Blommer")]
    public int s8_plums { get; set; }
    [Name("8. Andet stenfrugt")]
    public int s8_otherStoneFruit { get; set; }
    [Name("8. Ribs")]
    public int s8_currant { get; set; }
    [Name("8. Jordbær")]
    public int s8_strawberries { get; set; }
    [Name("8. Andet busk- og bærfrugt")]
    public int s8_otherBerryFruit { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<Statement, StatementCSVDto>()
        .ForMember(dest => dest.ClientName, map => map.MapFrom(from => from.Client.Name))
        .ForMember(dest => dest.ClientCVR, map => map.MapFrom(from => from.Client.CVRNumber))
        .ForMember(dest => dest.AccountantName, map =>
        {
          map.Condition(from => from.Accountant != null);
          map.MapFrom(from => from.Accountant.Name);
        });
    }
  }
}
