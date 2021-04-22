using Domain.Enums;
using System;
using Domain.Common;

namespace Domain.Entities
{
  public abstract class User : AuditableEntity
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public virtual RoleEnum Role { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
    public string? SSOTokenId { get; set; }
  }
}
