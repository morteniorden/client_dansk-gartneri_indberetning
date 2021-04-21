using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Address
  {
    public int Id { get; set; }
    public int ClientId { get; set; }
    public virtual Client Client { get; set; }

    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public string AddressLine3 { get; set; }
    public string AddressLine4 { get; set; }
  }
}
