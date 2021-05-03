using System;
using System.Linq;
using FluentAssertions;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Common.Interfaces;
using Application.Users;
using Application.Users.Commands.CreateClientCommand;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Application.UnitTests.Users.Commands.CreateClient
{
  public class CreateClientCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistClient()
    {
      var command = new CreateClientCommand
      {
        ClientDto = new ClientDto
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "13243546",
          Address = new AddressDto
          {
            AddressAndPlace = "test street 5",
            City = "1234 test city"
          }
        }
      };

      var handler = new CreateClientCommand.CreateAccountCommandHandler(Context, PasswordHasherMock.Object, TokenServiceMock.Object, MailServiceMock.Object, AccessorMock.Object, BackGroundJobClientMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = await Context.Clients.Include(e => e.Address).FirstOrDefaultAsync(e => e.Id == result);

      entity.Should().NotBeNull();
      entity.Email.Should().Be(command.ClientDto.Email);
      entity.Name.Should().Be(command.ClientDto.Name);
      entity.Tel.Should().Be(command.ClientDto.Tel);
      entity.CVRNumber.Should().Be(command.ClientDto.CVRNumber);
      entity.Address.Should().NotBeNull();
      entity.Address.Client.Should().NotBeNull();
    }

    [Fact]
    public async Task Handle_ShouldFailAccountEmail()
    {
      var command1 = new CreateClientCommand
      {
        ClientDto = new ClientDto
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "13243546",
          Address = new AddressDto
          {
            AddressAndPlace = "test street 5",
            City = "1234 test city"
          }
        }
      };

      var command2 = new CreateClientCommand
      {
        ClientDto = new ClientDto
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "43546578",
          Address = new AddressDto
          {
            AddressAndPlace = "test street 5",
            City = "1234 test city"
          }
        }
      };

      var handler = new CreateClientCommand.CreateAccountCommandHandler(Context, PasswordHasherMock.Object, TokenServiceMock.Object, MailServiceMock.Object, AccessorMock.Object, BackGroundJobClientMock.Object);
      await handler.Handle(command1, CancellationToken.None);

      Func<Task> action = async () => await handler.Handle(command2, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }

    [Fact]
    public async Task Handle_ShouldFailAccountCVR()
    {
      var command1 = new CreateClientCommand
      {
        ClientDto = new ClientDto
        {

          Email = "test@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "13243546",
          Address = new AddressDto
          {
            AddressAndPlace = "test street 5",
            City = "1234 test city"
          }
        }
      };

      var command2 = new CreateClientCommand
      {
        ClientDto = new ClientDto
        {
          Email = "test2@test.dk",
          Name = "test name",
          Tel = "12345678",
          CVRNumber = "13243546",
          Address = new AddressDto
          {
            AddressAndPlace = "test street 5",
            City = "1234 test city"
          }
        }
      };

      var handler = new CreateClientCommand.CreateAccountCommandHandler(Context, PasswordHasherMock.Object, TokenServiceMock.Object, MailServiceMock.Object, AccessorMock.Object, BackGroundJobClientMock.Object);
      await handler.Handle(command1, CancellationToken.None);

      Func<Task> action = async () => await handler.Handle(command2, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }
  }
}
