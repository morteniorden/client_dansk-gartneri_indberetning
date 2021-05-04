using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Statements;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.Users
{
  public class AccountantDto : UserDto, IAutoMap<Accountant>
  {
    public ICollection<StatementDto> Statements { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<Accountant, AccountantDto>();
    }
  }
}
