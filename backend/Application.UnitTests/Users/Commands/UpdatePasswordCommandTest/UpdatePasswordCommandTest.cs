using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Users;
using Application.Users.Commands.UpdatePassword;
using Domain.Enums;
using FluentAssertions;
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
        .Returns("1");

      CurrentUserServiceMock2 = new Mock<ICurrentUserService>();
      CurrentUserServiceMock2.Setup(m => m.UserId)
        .Returns("99");
    }

    [Fact]
    public async Task Handle_GivenValidPassword_ShouldUpdatePersistedUser()
    {
      var command = new UpdatePasswordCommand()
      {
        Id = 1,
        NewPassword = "NewPassword123"
      };

      var handler = new UpdatePasswordCommand.UpdatePasswordCommandHandler(Context, CurrentUserServiceMock.Object);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.Users.Find(command.Id);

      entity.Should().NotBeNull();
      entity.Password.Should().Be(command.NewPassword);
    }

    [Fact]
    public async Task Handle_GivenInvalidTokenId_ShouldThrowException()
    {
      var command = new UpdatePasswordCommand()
      {
        Id = 1,
        NewPassword = "NewPassword123"
      };

      var handler = new UpdatePasswordCommand.UpdatePasswordCommandHandler(Context, CurrentUserServiceMock2.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<UnauthorizedAccessException>();
    }

    [Fact]
    public async Task Handle_GivenInvalidId_ShouldThrowException()
    {
      var command = new UpdatePasswordCommand()
      {
        Id = 99,
        NewPassword = "NewPassword123"
      };

      var handler = new UpdatePasswordCommand.UpdatePasswordCommandHandler(Context, CurrentUserServiceMock2.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}
