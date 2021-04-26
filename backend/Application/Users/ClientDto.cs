using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Statements;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.Users
{
  public class ClientDto : IAutoMap<Client>
  {

    public string Tel { get; set; }
    public AddressDto Address { get; set; }
    public string CVRNumber { get; set; }
    public ICollection<StatementNoUsersDto> Statements { get; set; }
    public int Id { get; set; }
    public string Email { get; set; }
    public RoleEnum Role { get; set; }
    public string Name { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}
