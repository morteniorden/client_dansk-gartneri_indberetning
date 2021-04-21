using System.Collections.Generic;
using Application.Statements;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.Users
{
  public class AccountantDto : UserDto
  {
    public AccountantType AccountantType { get; set; }
    public ICollection<StatementDto> Statements { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<Accountant, AccountantDto>()
        .IncludeBase<User, UserDto>();
    }
  }
}
