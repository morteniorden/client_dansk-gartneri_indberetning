using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.CreateAccountantCommand;
using Domain.Enums;
using FluentAssertions;
using Application.Common.Exceptions;
using Domain.Entities;
using Xunit;

namespace Application.UnitTests.Users.Commands.CreateAccountant
{
  public class CreateAccountantCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistAccountant()
    {
      var command = new CreateAccountantCommand
      {
        Dto = new AssignAccountantDto
        {
          StatementId = 5,
          Email = "test@test.dk",
          AccountantType = AccountantType.Accountant
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context, PasswordHasherMock.Object, MailServiceMock.Object, BackGroundJobClientMock.Object, TokenServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var accountant = (Accountant) Context.Users.Find(result);

      accountant.Should().NotBeNull();
      accountant.Email.Should().Be(command.Dto.Email);

      var statement = Context.Statements.Find(command.Dto.StatementId);
      statement.Accountant.Should().Be(accountant);
      statement.AccountantId.Should().Be(accountant.Id);
      statement.AccountantType.Should().Be(command.Dto.AccountantType);
    }

    [Fact]
    public async Task Handle_GivenInvalidEmailThrowException()
    {
      var command = new CreateAccountantCommand
      {
        Dto = new AssignAccountantDto
        {
          StatementId = 5,
          Email = "test1@test1.dk",
          AccountantType = AccountantType.Accountant
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context, PasswordHasherMock.Object, MailServiceMock.Object, BackGroundJobClientMock.Object, TokenServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }
  }
}
