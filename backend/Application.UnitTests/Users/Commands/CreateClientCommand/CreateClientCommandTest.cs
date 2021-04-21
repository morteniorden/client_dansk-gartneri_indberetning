using System;
using System.Linq;
using FluentAssertions;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Accounts.Commands.CreateAccountCommand;
using Application.Common.Interfaces;
using Domain.Entities;
using Moq;
using Xunit;

namespace Application.UnitTests.Users.Commands.CreateClient
{
  public class CreateClientCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistClient()
    {
      var command = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "13243546",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city"
        }
      };

      var handler = new CreateAccountCommand.CreateAccountCommandHandler(Context, PasswordHasherMock.Object, TokenServiceMock.Object, MailServiceMock.Object, AccessorMock.Object, BackGroundJobClientMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = (Client) Context.Users.Find(result);

      entity.Should().NotBeNull();
      entity.Email.Should().Be(command.account.Email);
      entity.Name.Should().Be(command.account.Name);
      entity.Tel.Should().Be(command.account.Tel);
      entity.CVRNumber.Should().Be(command.account.CVRNumber);
      entity.Address.Should().NotBeNull();
      entity.Address.ClientId.Should().Be(entity.Id);
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
          CVRNumber = "13243546",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city"
        }
      };

      var command2 = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "43546578",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city"
        }
      };

      var handler = new CreateAccountCommand.CreateAccountCommandHandler(Context, PasswordHasherMock.Object, TokenServiceMock.Object, MailServiceMock.Object, AccessorMock.Object, BackGroundJobClientMock.Object);
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
          CVRNumber = "13243546",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city"
        }
      };

      var command2 = new CreateAccountCommand
      {
        account = new CreateAccountDto()
        {

          Email = "test2@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "13243546",
          AddressLine1 = "test street 5",
          AddressLine2 = "1234 test city"
        }
      };

      var handler = new CreateAccountCommand.CreateAccountCommandHandler(Context, PasswordHasherMock.Object, TokenServiceMock.Object, MailServiceMock.Object, AccessorMock.Object, BackGroundJobClientMock.Object);
      await handler.Handle(command1, CancellationToken.None);

      Func<Task> action = async () => await handler.Handle(command2, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }
  }
}
