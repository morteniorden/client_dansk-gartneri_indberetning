using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Users.Commands.UpdatePassword;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Application.UnitTests.Users.Commands.UpdatePasswordCommandTest
{
  public class UpdatePasswordCommandTest : CommandTestBase
  {
    public Mock<ICurrentUserService> CurrentUserServiceMock { get; set; }
    public Mock<ICurrentUserService> CurrentUserServiceMock2 { get; set; }
    public UpdatePasswordCommandTest()
    {
      CurrentUserServiceMock = new Mock<ICurrentUserService>();
      CurrentUserServiceMock.Setup(m => m.UserId)
        .Returns("test1@test1.dk");

      CurrentUserServiceMock2 = new Mock<ICurrentUserService>();
      CurrentUserServiceMock2.Setup(m => m.UserId)
        .Returns("invalidmail@invalidmail.dk");
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

      var entity = await Context.Users.FirstOrDefaultAsync(x => x.Email == CurrentUserServiceMock.Object.UserId);

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
