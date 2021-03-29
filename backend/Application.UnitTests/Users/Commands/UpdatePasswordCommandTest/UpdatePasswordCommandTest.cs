using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Users.Commands.UpdatePassword;
using FluentAssertions;
using Moq;
using Xunit;

namespace Application.UnitTests.Users.Commands.UpdatePasswordCommandTest
{
  public class UpdatePasswordCommandTest : CommandTestBase
  {
    public Mock<ICurrentUserService> CurrentUserServiceMock { get; set; }
    public Mock<ICurrentUserService> CurrentUserServiceMock2 { get; set; }
    //public Mock<IPasswordHasher> PasswordHasherMock { get; set; }
    public UpdatePasswordCommandTest()
    {
      CurrentUserServiceMock = new Mock<ICurrentUserService>();
      CurrentUserServiceMock.Setup(m => m.UserId)
        .Returns("1");

      CurrentUserServiceMock2 = new Mock<ICurrentUserService>();
      CurrentUserServiceMock2.Setup(m => m.UserId)
        .Returns("99");
      /*
      PasswordHasherMock = new Mock<IPasswordHasher>();
      PasswordHasherMock.Setup(m => m.Check("password", "password")).Returns((true, false));
      PasswordHasherMock.Setup(m => m.Hash("password")).Returns("password");
      */
    }

    [Fact]
    public async Task Handle_GivenValidPassword_ShouldUpdatePersistedUser()
    {
      var command = new UpdatePasswordCommand()
      {
        NewPassword = "NewPassword123"
      };

      var handler = new UpdatePasswordCommand.UpdatePasswordCommandHandler(Context, CurrentUserServiceMock.Object, PasswordHasherMock.Object);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.Users.Find(int.Parse(CurrentUserServiceMock.Object.UserId));

      entity.Should().NotBeNull();
      entity.Password.Should().Be(PasswordHasherMock.Object.Hash(command.NewPassword));
    }

    [Fact]
    public async Task Handle_GivenInvalidTokenId_ShouldThrowException()
    {
      var command = new UpdatePasswordCommand()
      {
        NewPassword = "NewPassword123"
      };

      var handler = new UpdatePasswordCommand.UpdatePasswordCommandHandler(Context, CurrentUserServiceMock2.Object, PasswordHasherMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}
