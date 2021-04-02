using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Users;
using Application.Users.Commands.UpdateUserCommand;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Users.Commands.UpdateUserCommandTest
{
  public class UpdateUserCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_GivenValidId_ShouldUpdatePersistedUser()
    {
      var command = new UpdateUserCommand
      {
        Id = 1,
        User = new UserDto()
        {
          Name = "TestUpdate",
          Email = "TestEmail"
        }
      };

      var handler = new UpdateUserCommand.UpdateUserCommandHandler(Context);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.Users.Find(command.Id);

      entity.Should().NotBeNull();
      entity.Name.Should().Be(command.User.Name);
      entity.Email.Should().Be(command.User.Email);
    }

    [Fact]
    public void Handle_GivenInvalidId_ThrowsException()
    {
      var command = new UpdateUserCommand
      {
        Id = 99,
        User = new UserDto()
        {
          Name = "TestUpdate",
          Email = "TestEmail"
        }
      };

      var handler = new UpdateUserCommand.UpdateUserCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }

    [Fact]
    public void Handle_GivenAlreadyInUseEmail_ThrowsException()
    {
      var command = new UpdateUserCommand
      {
        Id = 1,
        User = new UserDto()
        {
          Name = "TestUpdate",
          Email = "test2@test2.dk" //Already used by user defined in ApplicationDbContextFactory
        }
      };

      var handler = new UpdateUserCommand.UpdateUserCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ArgumentException>();
    }
  }
}
