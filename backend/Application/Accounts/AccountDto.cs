using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Statements;
using Application.Users;
using AutoMapper;
using Domain.Entities;
using Domain.EntityExtensions;

namespace Application.Accounts
{
  public class AccountDto 
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Tel { get; set; }
    public int AddressId { get; set; }
    public AddressDto Address { get; set; }
    public string CVRNumber { get; set; }
    public DateTimeOffset? DeactivationTime { get; set; }
    public ICollection<ClientDto> Users { get; set; }
    public ClientDto Client { get; set; }
    public ClientDto Accountant { get; set; }
    public ICollection<StatementDto> Statements { get; set; }
   
  }
}
//: IAutoMap<Account>
/*
 public void Mapping(Profile profile)
    {
      profile.CreateMap<Account, AccountDto>()
        .ForMember(dest => dest.Client, map => map.MapFrom(from => from.GetClient()))
        .ForMember(dest => dest.Accountant, map => map.MapFrom(from => from.GetActiveAccountant()));
    }
 */
