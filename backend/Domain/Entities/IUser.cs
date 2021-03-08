using Domain.Enums;
using System;

namespace Domain.Entities
{
  public interface IUser
  {
    int Id { get; set; }
    string Email { get; set; }
    string Password { get; set; }
    RoleEnum Role { get; set; }
    string Name { get; set; }
    DateTimeOffset? DeactivationTime { get; set; }
  }
}
