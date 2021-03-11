using System;
using System.Linq;
using FluentAssertions;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Commands.CreateAccountCommand;
using Xunit;

namespace Application.UnitTests.Accounts.Commands.CreateAccount
{
  public class CreateAccountCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistAccount()
    {
      var command = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city",
          CVRNumber = "13243546"
        }
      };

      var handler = new CreateAccountCommand.CreateAccountCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Accounts.Find(result);

      entity.Should().NotBeNull();
      entity.Email.Should().Be(command.account.Email);
      entity.Name.Should().Be(command.account.Name);
      entity.Tel.Should().Be(command.account.Tel);
      entity.CVRNumber.Should().Be(command.account.CVRNumber);
      entity.Address.Should().NotBeNull();
      entity.Address.Account.Should().Be(entity);
      entity.Address.AccountId.Should().Be(entity.Id);
      entity.Address.AddressLine1.Should().Be(command.account.AddressLine1);
      entity.Address.AddressLine2.Should().Be(command.account.AddressLine2);
      entity.Users.Should().HaveCount(1);

      var user = entity.Users.First();
      user.Name.Should().Be(command.account.Name);
      user.Email.Should().Be(command.account.Email);
      user.AccountId.Should().Be(entity.Id);
      user.Account.Should().Be(entity);
    }

    [Fact]
    public async Task Handle_ShouldFailAccountEmail()
    {
      var command1 = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city",
          CVRNumber = "13243546"
        }
      };

      var command2 = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city",
          CVRNumber = "43546578"
        }
      };

      var handler = new CreateAccountCommand.CreateAccountCommandHandler(Context);
      await handler.Handle(command1, CancellationToken.None);

      Func<Task> action = async () => await handler.Handle(command2, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }

    [Fact]
    public async Task Handle_ShouldFailAccountCVR()
    {
      var command1 = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city",
          CVRNumber = "13243546"
        }
      };

      var command2 = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test2@test.dk",
          Name = "test name",
          Tel = "12345678",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city",
          CVRNumber = "13243546"
        }
      };

      var handler = new CreateAccountCommand.CreateAccountCommandHandler(Context);
      await handler.Handle(command1, CancellationToken.None);

      Func<Task> action = async () => await handler.Handle(command2, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }
  }
}
