using System;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class AdminUser : AuditableEntity, IUser
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}
