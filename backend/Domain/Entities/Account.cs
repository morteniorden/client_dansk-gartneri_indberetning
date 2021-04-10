
using System.Collections.Generic;
using Domain.Common;
using System;

namespace Domain.Entities
{
  public class Account : AuditableEntity
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Tel { get; set; }
    public int? AddressId { get; set; }
    public virtual Address Address { get; set; }
    public string CVRNumber { get; set; }
    public virtual ICollection<User> Users { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
    public virtual ICollection<Statement> Statements { get; set; }
  }
}
