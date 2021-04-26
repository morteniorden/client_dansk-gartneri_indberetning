using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using FluentAssertions;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Infrastructure.IntegrationTests.Persistence
{
  public class ApplicationDbContextTests : IDisposable
  {
    private readonly string _userId;
    private readonly DateTimeOffset _dateTimeOffset;
    private readonly Mock<IDateTimeOffsetService> _dateTimeOffsetMock;
    private readonly Mock<ICurrentUserService> _currentUserServiceMock;
    private readonly ApplicationDbContext _context;

    public ApplicationDbContextTests()
    {
      _dateTimeOffset = new DateTimeOffset(3001, 1, 1, 1, 1, 1, TimeSpan.Zero);
      _dateTimeOffsetMock = new Mock<IDateTimeOffsetService>();
      _dateTimeOffsetMock.Setup(m => m.Now).Returns(_dateTimeOffset);

      _userId = "00000000-0000-0000-0000-000000000000";
      _currentUserServiceMock = new Mock<ICurrentUserService>();
      _currentUserServiceMock.Setup(m => m.UserId).Returns(_userId);

      var options = new DbContextOptionsBuilder<ApplicationDbContext>()
          .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning))
          .UseInMemoryDatabase(Guid.NewGuid().ToString())
          .Options;
      _context = new ApplicationDbContext(options, _currentUserServiceMock.Object, _dateTimeOffsetMock.Object);

      _context.SaveChanges();
    }

    [Fact(Skip = "No more example test")]
    public async Task SaveChangesAsync_GivenNewTodoItem_ShouldSetCreatedProperties()
    {

    }

    [Fact(Skip = "No more example test")]
    public async Task SaveChangesAsync_GivenExistingTodoItem_ShouldSetLastModifiedProperties()
    {

    }
    public void Dispose()
    {
      _context?.Dispose();
    }
  }
}
