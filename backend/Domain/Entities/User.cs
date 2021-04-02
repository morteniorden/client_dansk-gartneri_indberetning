using Domain.Enums;
using System;
using Domain.Common;

namespace Domain.Entities
{
  public class User : AuditableEntity, IUser
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
    public int AccountId { get; set; }
    public virtual Account Account { get; set; }
    public string SSOTokenId { get; set; }
  }
}
