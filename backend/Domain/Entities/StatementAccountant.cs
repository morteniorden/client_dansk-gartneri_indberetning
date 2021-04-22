using Domain.Enums;

namespace Domain.Entities
{
  public class StatementAccountant
  {
    public Accountant Accountant { get; set; }
    public AccountantType AccountantType { get; set; }
  }
}
