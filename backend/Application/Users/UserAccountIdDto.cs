using AutoMapper;
using Domain.Entities;

namespace Application.Users
{
  public class UserAccountIdDto : UserDto
  {
    public int AccountId { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<User, UserAccountIdDto>()
        .IncludeBase<IUser, UserDto>();
    }
  }
}
