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
        AccountantDto = new ClientDto()
        {

          Name = "test name",
          Email = "test@test.dk",
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = (Accountant)Context.Users.Find(result);

      entity.Should().NotBeNull();
      entity.Name.Should().Be(command.AccountantDto.Name);
      entity.Email.Should().Be(command.AccountantDto.Email);
    }

    [Fact]
    public async Task Handle_GivenInvalidEmailThrowException()
    {
      var command = new CreateAccountantCommand
      {
        AccountantDto = new ClientDto()
        {

          Name = "test name",
          Email = "test1@test1.dk", //Already used by an account and user defined in ApplicationDbContextFactory
        }
      };

      var handler = new CreateAccountantCommand.CreateAccountantCommandHandler(Context);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);
      action.Should().Throw<ArgumentException>();
    }
  }
}
