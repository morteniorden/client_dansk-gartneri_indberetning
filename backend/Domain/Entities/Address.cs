using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Address
  {
    public int Id { get; set; }
    public int ClientId { get; set; }
    public virtual Client Client { get; set; }

    public string FirmName { get; set; }
    public string OwnerName { get; set; }
    public string AddressAndPlace { get; set; }
    public string PostalCode { get; set; }
    public string City { get; set; }
  }
}
