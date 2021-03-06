using System;
using System.Collections.Generic;
using Domain.Enums;

namespace Domain.Entities
{
  public class Accountant : User
  {
    public RoleEnum Role { get; set; } = RoleEnum.Accountant;
    public virtual ICollection<Statement> Statements { get; set; }
  }
}
