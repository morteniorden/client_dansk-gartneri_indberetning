using System;
using System.Collections.Generic;
using Domain.Enums;

namespace Domain.Entities
{
  public class Accountant : User
  {
    public AccountantType AccountantType { get; set; }
    public virtual ICollection<Statement> Statements { get; set; }
  }
}
