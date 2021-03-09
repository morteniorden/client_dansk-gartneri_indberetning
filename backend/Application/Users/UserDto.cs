using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;
using System;
using AutoMapper;

namespace Application.Users
{
  public class UserDto : IAutoMap<User>
  {
    public string Email { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}
