using System.Collections.Generic;
using Application.Statements;
using AutoMapper;
using Domain.Entities;

namespace Application.Users
{
  public class ClientDto : UserDto
  {
    public string Tel { get; set; }
    public AddressDto Address { get; set; }
    public string CVRNumber { get; set; }
    public ICollection<StatementDto> Statements { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<Client, ClientDto>()
        .IncludeBase<User, UserDto>();
    }
  }
}
