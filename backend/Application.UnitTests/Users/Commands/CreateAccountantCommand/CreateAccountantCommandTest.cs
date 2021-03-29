using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Users;
using Application.Users.Commands.CreateAccountantCommand;
using Domain.Enums;
using FluentAssertions;
using Application.Common.Exceptions;
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
        AccountantDto = new UserAccountIdDto()
        {

          Name = "test name",
          Email = "test@test.dk",
          AccountId = 2
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Users.Find(result);
      var account = Context.Accounts.Find(command.AccountantDto.AccountId);

      entity.Should().NotBeNull();
      entity.Name.Should().Be(command.AccountantDto.Name);
      entity.Email.Should().Be(command.AccountantDto.Email);
      entity.AccountId.Should().Be(command.AccountantDto.AccountId);
      entity.Account.Should().Be(account);
    }

    [Fact]
    public async Task Handle_GivenInvalidAccountThrowException()
    {
      var command = new CreateAccountantCommand
      {
        AccountantDto = new UserAccountIdDto()
        {

          Name = "test name",
          Email = "test@test.dk",
          AccountId = 99
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<NotFoundException>();
    }

    [Fact]
    public async Task Handle_GivenInvalidEmailThrowException()
    {
      var command = new CreateAccountantCommand
      {
        AccountantDto = new UserAccountIdDto()
        {

          Name = "test name",
          Email = "test1@test1.dk", //Already used by an account and user defined in ApplicationDbContextFactory
          AccountId = 2
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }

    [Fact]
    public async Task Handle_GivenAccountHasAccountantThrowException()
    {
      var command = new CreateAccountantCommand
      {
        AccountantDto = new UserAccountIdDto()
        {

          Name = "test name",
          Email = "test@test.dk",
          AccountId = 1
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<InvalidOperationException>();
    }

    [Fact]
    public async Task Handle_GivenAccountantHasAccountThrowException()
    {
      var command = new CreateAccountantCommand
      {
        AccountantDto = new UserAccountIdDto()
        {
          Name = "test name",
          Email = "test1accountant@test.dk", //Matches an existing accountant in ApplicationDbContextFactory
          AccountId = 2
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<InvalidOperationException>();
    }
  }
}
