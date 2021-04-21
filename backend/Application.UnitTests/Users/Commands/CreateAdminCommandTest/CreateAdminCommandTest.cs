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
    public async Task Handle_ShouldPersistAccount()
    {
      var command = new CreateAdminCommand
      {
        user = new CreateUserDto
        {

          Email = "admin@admin.dk",
          Password = "Password123",
          Name = "admin"
        }
      };

      var passwordHasherMock = new Mock<IPasswordHasher>();
      passwordHasherMock.Setup(m => m.Check("password", "password")).Returns((true, false));
      passwordHasherMock.Setup(m => m.Hash(command.user.Password)).Returns(command.user.Password);

      var handler = new CreateAdminCommand.CreateAdminCommandHandler(Context, passwordHasherMock.Object);

      var adminCount = Context.Users.Where(e => e.Role == RoleEnum.Admin).Count();

      var result = await handler.Handle(command, CancellationToken.None);

      var user = Context.Users.Find(result);
      user.Id.Should().Be(adminCount + 1);
      user.Name.Should().Be(command.user.Name);
      user.Email.Should().Be(command.user.Email);
      user.Password.Should().Be(command.user.Password);
      user.Role.Should().Be(RoleEnum.Admin);
    }
  }
}
