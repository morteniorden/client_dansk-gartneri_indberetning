using Application.Common.Exceptions;
using Application.ExampleChildren;
using Application.ExampleChildren.Commands.UpdateExampleChild;
using Domain.Enums;
using FluentAssertions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Statements.Commands.ApproveStatement;
using Moq;
using Xunit;

namespace Application.UnitTests.Statements.Commands.ConsentToStatementTest
{
  public class ConsentToStatementCommandTest : CommandTestBase
  {
    public Mock<ICurrentUserService> CurrentUserServiceMock { get; set; }
    public ConsentToStatementCommandTest()
    {
      CurrentUserServiceMock = new Mock<ICurrentUserService>();
      CurrentUserServiceMock.Setup(m => m.UserId)
        .Returns("test1accountant@test.dk");
    }


    [Fact]
    public async Task Handle_GivenValidId_ShouldUpdatePersistedStatement()
    {
      var command = new ConsentToStatementCommand
      {
        Id = 1
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      var entity = Context.Statements.Find(command.Id);
      entity.Should().NotBeNull();
      entity.IsApproved.Should().BeFalse();

      await handler.Handle(command, CancellationToken.None);

      entity.IsApproved.Should().BeTrue();
    }

    [Fact]
    public void Handle_GivenInvalidId_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Id = 99
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }

    [Fact]
    public void Handle_GivenAlreadyApproved_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Id = 2
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public void Handle_GivenAlreadySignedOff_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Id = 3
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public void Handle_GivenInvalidAccount_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Id = 4
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<UnauthorizedAccessException>();
    }
  }
}
