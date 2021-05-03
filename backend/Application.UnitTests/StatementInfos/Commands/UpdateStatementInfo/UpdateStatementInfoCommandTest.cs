using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Mappings;
using Application.StatementInfos;
using Application.StatementInfos.Commands.UpdateStatementInfo;
using AutoMapper;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.StatementInfos.Commands.UpdateStatementInfo
{
  public class UpdateStatementInfoCommandTest : CommandTestBase
  {
    public IMapper Mapper { get; set; }

    public UpdateStatementInfoCommandTest()
    {
      var configurationProvider = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<MappingProfile>();
      });

      Mapper = configurationProvider.CreateMapper();
    }

    [Fact]
    public async Task Handle_GivenValidYearAndData_ShouldUpdatePersistedStatementInfo()
    {
      var command = new UpdateStatementInfoCommand
      {
        AccountingYear = 2019,
        NewInfo = new StatementInfoDto
        {
          Id = 1,
          AccountingYear = 2019,
          s1_boughtPlants_permille = 50.0f,
          s1_boughtPlants_help = "test1",
          s1_mushrooms_permille = 10.02f,
          s1_mushrooms_help = "test2"
        }
      };

      var handler = new UpdateStatementInfoCommand.UpdateStatementInfoCommandHandler(Context, Mapper);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.StatementInfo.FirstOrDefault(e => e.AccountingYear == command.AccountingYear);

      entity.Should().NotBeNull();
      entity.s1_boughtPlants_permille.Should().Be(command.NewInfo.s1_boughtPlants_permille);
      entity.s1_boughtPlants_help.Should().Be(command.NewInfo.s1_boughtPlants_help);
      entity.s1_mushrooms_permille.Should().Be(command.NewInfo.s1_mushrooms_permille);
      entity.s1_mushrooms_help.Should().Be(command.NewInfo.s1_mushrooms_help);
    }

    [Fact]
    public void Handle_GivenInvalidYear_ThrowsException()
    {
      var command = new UpdateStatementInfoCommand()
      {
        AccountingYear = 9999,
        NewInfo = new StatementInfoDto
        {
          Id = 1,
          AccountingYear = 9999,
          s1_boughtPlants_permille = 50.0f,
          s1_boughtPlants_help = "test1",
          s1_mushrooms_permille = 10.02f,
          s1_mushrooms_help = "test2"
        }
      };

      var handler = new UpdateStatementInfoCommand.UpdateStatementInfoCommandHandler(Context, Mapper);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }

    [Fact]
    public void Handle_GivenYearsDontMatch_ThrowsException()
    {
      var command = new UpdateStatementInfoCommand()
      {
        AccountingYear = 2019,
        NewInfo = new StatementInfoDto
        {
          Id = 1,
          AccountingYear = 2021,
          s1_boughtPlants_permille = 50.0f,
          s1_boughtPlants_help = "test1",
          s1_mushrooms_permille = 10.02f,
          s1_mushrooms_help = "test2"
        }
      };

      var handler = new UpdateStatementInfoCommand.UpdateStatementInfoCommandHandler(Context, Mapper);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ArgumentException>();
    }
  }
}
