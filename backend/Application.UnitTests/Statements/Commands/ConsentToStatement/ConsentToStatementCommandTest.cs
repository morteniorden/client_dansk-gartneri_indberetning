using Application.Common.Exceptions;
using Domain.Enums;
using FluentAssertions;
using System;
using System.IO;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Statements;
using Application.Statements.Commands.ConsentToStatement;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Application.UnitTests.Statements.Commands.ConsentToStatementTest
{
  public class ConsentToStatementCommandTest : CommandTestBase
  {
    public Mock<ICurrentUserService> CurrentUserServiceMock { get; set; }
    public IOptions<FileDriveOptions> options { get; set; }
    public IOptions<StatementOptions> StatementOptions { get; set; }
    public ConsentToStatementCommandTest()
    {
      CurrentUserServiceMock = new Mock<ICurrentUserService>();
      CurrentUserServiceMock.Setup(m => m.UserId)
        .Returns("test1accountant@test.dk");

      options = Options.Create(new FileDriveOptions());
      StatementOptions = Options.Create(new StatementOptions());
    }

    //TODO: Not working properly. Find solution
    private IFormFile CreateTestFormFile(string fileName, string fileContent)
    {
      byte[] s_Bytes = Encoding.UTF8.GetBytes(fileContent);

      return new FormFile(
        baseStream: new MemoryStream(s_Bytes),
        baseStreamOffset: 0,
        length: s_Bytes.Length,
        name: "Data",
        fileName: fileName
      );
    }

    [Fact(Skip = "Needs a FormFile that has a ContentType")]
    public async Task Handle_GivenValidId_ShouldUpdatePersistedStatement()
    {
      var command = new ConsentToStatementCommand
      {
        Dto = new StatementConsentDto
        {
          StatementId = 1,
          File = CreateTestFormFile("testName.pdf", "this is a test")
        }
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object, options, PenneoClientMock.Object, StatementOptions);

      var entity = Context.Statements.Find(command.Dto.StatementId);
      entity.Should().NotBeNull();
      entity.IsApproved.Should().BeFalse();

      await handler.Handle(command, CancellationToken.None);

      entity.IsApproved.Should().BeTrue();
    }

    [Fact(Skip = "Needs a FormFile that has a ContentType")]
    public void Handle_GivenInvalidId_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Dto = new StatementConsentDto
        {
          StatementId = 99,
          File = CreateTestFormFile("testName", "this is a test")
        }
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object, options, PenneoClientMock.Object, StatementOptions);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }

    [Fact(Skip = "Needs a FormFile that has a ContentType")]
    public void Handle_GivenAlreadyApproved_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Dto = new StatementConsentDto
        {
          StatementId = 2,
          File = CreateTestFormFile("testName", "this is a test")
        }
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object, options, PenneoClientMock.Object, StatementOptions);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact(Skip = "Needs a FormFile that has a ContentType")]
    public void Handle_GivenAlreadySignedOff_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Dto = new StatementConsentDto
        {
          StatementId = 3,
          File = CreateTestFormFile("testName", "this is a test")
        }
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object, options, PenneoClientMock.Object, StatementOptions);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<InvalidOperationException>();
    }

    [Fact(Skip = "Needs a FormFile that has a ContentType")]
    public void Handle_GivenWrongAccountant_ThrowsException()
    {
      var command = new ConsentToStatementCommand
      {
        Dto = new StatementConsentDto
        {
          StatementId = 4,
          File = CreateTestFormFile("testName", "this is a test")
        }
      };

      var handler = new ConsentToStatementCommand.ConsentToStatementCommandHandler(Context, CurrentUserServiceMock.Object, options, PenneoClientMock.Object, StatementOptions);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<UnauthorizedAccessException>();
    }
  }
}
