using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Accounts
{
  public class AddressDto : IAutoMap<Address>
  {
    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public string AddressLine3 { get; set; }
    public string AddressLine4 { get; set; }
  }
}
