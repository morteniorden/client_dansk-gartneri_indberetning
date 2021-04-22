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
        StatementId = 1,
        AccountantDto = new AccountantDto
        {
          Id = 7,
          Name = "test name",
          Email = "test@test.dk",
          AccountantType = AccountantType.Accountant
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var accountant = (Accountant) Context.Users.Find(result);

      accountant.Should().NotBeNull();
      accountant.Name.Should().Be(command.AccountantDto.Name);
      accountant.Email.Should().Be(command.AccountantDto.Email);
      accountant.AccountantType.Should().Be(command.AccountantDto.AccountantType);

      var statement = Context.Statements.Find(1);
      statement.Accountant.Should().Be(accountant);
      statement.AccountantId.Should().Be(accountant.Id);
    }

    [Fact]
    public async Task Handle_GivenInvalidEmailThrowException()
    {
      var command = new CreateAccountantCommand
      {
        StatementId = 1,
        AccountantDto = new AccountantDto()
        {
          Id = 7,
          Name = "test name",
          Email = "test1@test1.dk", //Already used by an account and user defined in ApplicationDbContextFactory
          AccountantType = AccountantType.Accountant
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }
  }
}
