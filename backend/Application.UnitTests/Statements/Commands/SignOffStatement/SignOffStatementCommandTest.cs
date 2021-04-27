using Application.Common.Exceptions;
using Application.ExampleChildren;
using Domain.Enums;
using FluentAssertions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Statements.Commands.ApproveStatement;
using Application.Statements.Commands.SignOffStatement;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Application.UnitTests.Statements.Commands.ApproveStatementTest
{
  public class SignOffStatementCommandTest : CommandTestBase
  {
    public Mock<ICurrentUserService> CurrentUserServiceMock { get; set; }
    public Mock<IOptions<StatementOptions>> OptionsMock { get; set; }
    public SignOffStatementCommandTest()
    {
      CurrentUserServiceMock = new Mock<ICurrentUserService>();
      CurrentUserServiceMock.Setup(m => m.UserId)
        .Returns("test1@test1.dk");

      StatementOptions statementOptions = new StatementOptions {LimitForRequiredAccountant = 100000};
      OptionsMock = new Mock<IOptions<StatementOptions>>();
      OptionsMock.Setup(m => m.Value).Returns(statementOptions);
    }

    [Fact]
    public async Task Handle_GivenValidIdAndNoAccountant_ShouldUpdatePersistedStatement()
    {
      var command = new SignOffStatementCommand
      {
        Id = 5
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      var entity = Context.Statements.Find(command.Id);
      entity.Should().NotBeNull();
      entity.Status.Should().NotBe(StatementStatus.SignedOff);

      await handler.Handle(command, CancellationToken.None);

      entity.Status.Should().Be(StatementStatus.SignedOff);
    }

    [Fact]
    public async Task Handle_GivenValidIdAndApproval_ShouldUpdatePersistedStatement()
    {
      var command = new SignOffStatementCommand
      {
        Id = 6
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      var entity = Context.Statements.Find(command.Id);
      entity.Should().NotBeNull();
      entity.Status.Should().NotBe(StatementStatus.SignedOff);

      await handler.Handle(command, CancellationToken.None);

      entity.Status.Should().Be(StatementStatus.SignedOff);
    }

    [Fact]
    public void Handle_GivenInvalidId_ThrowsException()
    {
      var command = new SignOffStatementCommand
      {
        Id = 99
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }

    [Fact]
    public void Handle_GivenAlreadySignedOff_ThrowsException()
    {
      var command = new SignOffStatementCommand
      {
        Id = 3
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public void Handle_GivenInvalidClient_ThrowsException()
    {
      var command = new SignOffStatementCommand
      {
        Id = 2
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<UnauthorizedAccessException>();
    }

    [Fact]
    public void Handle_GivenAccountantAndNotApproved_ThrowsException()
    {
      var command = new SignOffStatementCommand
      {
        Id = 1
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public void Handle_GivenNoAccountantAndExceedingTotal_ThrowsException()
    {
      var command = new SignOffStatementCommand
      {
        Id = 7
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public async Task Handle_GivenAccountantAndExceedingTotal_ShouldUpdatePersistedStatement()
    {
      var command = new SignOffStatementCommand
      {
        Id = 8
      };

      var handler = new SignOffStatementCommand.SignOffStatementCommandHandler(Context, CurrentUserServiceMock.Object, OptionsMock.Object);

      var entity = Context.Statements.Find(command.Id);
      entity.Should().NotBeNull();
      entity.Status.Should().NotBe(StatementStatus.SignedOff);

      await handler.Handle(command, CancellationToken.None);

      entity.Status.Should().Be(StatementStatus.SignedOff);
    }
  }
}
