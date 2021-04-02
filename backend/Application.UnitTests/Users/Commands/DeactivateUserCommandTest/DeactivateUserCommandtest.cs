using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Users.Commands.DeactivateUserCommand;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Users.Commands.DeactivateUserCommandtest
{
  public class DeactivateUserCommandtest : CommandTestBase
  {
    [Fact]
    public async Task Handle_GivenValidId_ShouldUpdatePersistedUser()
    {
      var command = new DeactivateUserCommand
      {
        Id = 1,
      };

      var handler = new DeactivateUserCommand.DeactivateUserCommandHandler(Context);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.Users.Find(command.Id);

      entity.Should().NotBeNull();
      entity.DeactivationTime.Should().NotBeNull();
    }

    [Fact]
    public void Handle_GivenInvalidId_ThrowsException()
    {
      var command = new DeactivateUserCommand
      {
        Id = 99
      };

      var handler = new DeactivateUserCommand.DeactivateUserCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}
