using System;
using System.Collections.Generic;
using Domain.Enums;

namespace Domain.Entities
{
  public class Accountant : User
  {
    public override RoleEnum Role { get; set; } = RoleEnum.Accountant;
    public AccountantType AccountantType { get; set; }
    public virtual ICollection<Statement> Statements { get; set; }
  }
}
