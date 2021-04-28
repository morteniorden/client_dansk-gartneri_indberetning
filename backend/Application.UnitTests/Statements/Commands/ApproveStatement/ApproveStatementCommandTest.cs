using Application.Common.Exceptions;
using Domain.Enums;
using FluentAssertions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Statements.Commands.ApproveStatement;
using Moq;
using Xunit;

namespace Application.UnitTests.Statements.Commands.ApproveStatementTest
{
  public class ApproveStatementCommandTest : CommandTestBase
  {
    public Mock<ICurrentUserService> CurrentUserServiceMock { get; set; }
    public ApproveStatementCommandTest()
    {
      CurrentUserServiceMock = new Mock<ICurrentUserService>();
      CurrentUserServiceMock.Setup(m => m.UserId)
        .Returns("test1accountant@test.dk");
    }


    [Fact]
    public async Task Handle_GivenValidId_ShouldUpdatePersistedStatement()
    {
      var command = new ApproveStatementCommand
      {
        Id = 1
      };

      var handler = new ApproveStatementCommand.ApproveStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      var entity = Context.Statements.Find(command.Id);
      entity.Should().NotBeNull();
      entity.IsApproved.Should().BeFalse();

      await handler.Handle(command, CancellationToken.None);

      entity.IsApproved.Should().BeTrue();
    }

    [Fact]
    public void Handle_GivenInvalidId_ThrowsException()
    {
      var command = new ApproveStatementCommand
      {
        Id = 99
      };

      var handler = new ApproveStatementCommand.ApproveStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }

    [Fact]
    public void Handle_GivenAlreadyApproved_ThrowsException()
    {
      var command = new ApproveStatementCommand
      {
        Id = 2
      };

      var handler = new ApproveStatementCommand.ApproveStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public void Handle_GivenAlreadySignedOff_ThrowsException()
    {
      var command = new ApproveStatementCommand
      {
        Id = 3
      };

      var handler = new ApproveStatementCommand.ApproveStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public void Handle_GivenWrongAccountant_ThrowsException()
    {
      var command = new ApproveStatementCommand
      {
        Id = 4
      };

      var handler = new ApproveStatementCommand.ApproveStatementCommandHandler(Context, CurrentUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<UnauthorizedAccessException>();
    }
  }
}
