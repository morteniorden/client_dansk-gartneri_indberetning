using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Users;
using AutoMapper;
using Domain.Entities;

namespace Application.Accounts
{
  public class AccountDto : IAutoMap<Account>
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Tel { get; set; }
    public int AddressId { get; set; }
    public Address Address { get; set; }
    public string CVRNumber { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
  }
}
