using System.Linq;
using FluentAssertions;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts.Commands.CreateAdmin;
using Application.Common.Interfaces;
using Application.Users;
using Domain.Enums;
using Moq;
using Xunit;

namespace Application.UnitTests.Users.Commands.CreateAdmin
{
  public class CreateAdminCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistAdmin()
    {
      var command = new CreateAdminCommand
      {
        Admin = new CreateAdminDto()
        {
          Email = "admin@admin.dk",
          Password = "Password123",
          Name = "admin"
        }
      };

      var passwordHasherMock = new Mock<IPasswordHasher>();
      passwordHasherMock.Setup(m => m.Check("password", "password")).Returns((true, false));
      passwordHasherMock.Setup(m => m.Hash(command.Admin.Password)).Returns(command.Admin.Password);

      var handler = new CreateAdminCommand.CreateAdminCommandHandler(Context, passwordHasherMock.Object);

      var adminCount = Context.Users.Count();

      var result = await handler.Handle(command, CancellationToken.None);

      var user = Context.Admins.First(x => x.Id == result);
      user.Id.Should().Be(adminCount + 1);
      user.Name.Should().Be(command.Admin.Name);
      user.Email.Should().Be(command.Admin.Email);
      user.Password.Should().Be(command.Admin.Password);
      user.Role.Should().Be(RoleEnum.Admin);
    }
  }
}
