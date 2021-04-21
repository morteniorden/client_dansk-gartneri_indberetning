using Domain.Enums;
using System;
using System.Collections.Generic;
using Domain.Common;

namespace Domain.Entities
{
  public class Client : User
  {
    public string Tel { get; set; }
    public int? AddressId { get; set; }
    public virtual Address Address { get; set; }
    public string CVRNumber { get; set; }
    public virtual ICollection<Statement> Statements { get; set; }
  }
}
