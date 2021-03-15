using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;
using System;
using AutoMapper;

namespace Application.Users
{
  public class UserDto : IAutoMap<IUser>
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}
