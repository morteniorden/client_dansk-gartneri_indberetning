using System;
using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
  public class Admin : User
  {
    public override RoleEnum Role { get; set; } = RoleEnum.Admin;
  }
}
