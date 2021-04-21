using System.Collections.Generic;
using Application.Statements;
using AutoMapper;
using Domain.Entities;

namespace Application.Users
{
  public class AccountantDto : UserDto
  {
    public ICollection<StatementDto> Statements { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<Client, ClientDto>()
        .IncludeBase<User, UserDto>();
    }
  }
}
