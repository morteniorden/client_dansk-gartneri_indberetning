using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Users
{
  public class AddressDto : IAutoMap<Address>
  {
    public string FirmName { get; set; }
    public string OwnerName { get; set; }
    public string AddressAndPlace { get; set; }
    public string PostalCode { get; set; }
    public string City { get; set; }
  }
}
