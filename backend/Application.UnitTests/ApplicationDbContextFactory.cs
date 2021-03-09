using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Moq;
using System;

namespace Application.UnitTests
{
  public static class ApplicationDbContextFactory
  {
    public static ApplicationDbContext Create()
    {
      var options = new DbContextOptionsBuilder<ApplicationDbContext>()
          .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning))
          .UseInMemoryDatabase(Guid.NewGuid().ToString())
          .Options;

      var dateTimeMock = new Mock<IDateTimeOffsetService>();
      dateTimeMock.Setup(m => m.Now)
          .Returns(new DateTimeOffset(3001, 1, 1, 1, 1, 1, TimeSpan.Zero));

      var currentUserServiceMock = new Mock<ICurrentUserService>();
      currentUserServiceMock.Setup(m => m.UserId)
          .Returns("00000000-0000-0000-0000-000000000000");

      var context = new ApplicationDbContext(options, currentUserServiceMock.Object, dateTimeMock.Object);

      context.Database.EnsureCreated();

      SeedSampleData(context);

      return context;
    }

    public static void SeedSampleData(ApplicationDbContext context)
    {
      context.ExampleParents.AddRange(
          new ExampleParent() { Id = 1, Name = "Test 1" },
          new ExampleParent() { Id = 2, Name = "Test 2" }
      );

      context.ExampleChildren.AddRange(
          new ExampleChild { Id = 1, ParentId = 1, Name = "Bread", Type = ExampleEnum.Youngest },
          new ExampleChild { Id = 2, ParentId = 1, Name = "Butter", Type = ExampleEnum.Youngest },
          new ExampleChild { Id = 3, ParentId = 1, Name = "Milk", Type = ExampleEnum.Middle },
          new ExampleChild { Id = 4, ParentId = 2, Name = "Sugar", Type = ExampleEnum.Middle },
          new ExampleChild { Id = 5, ParentId = 2, Name = "Coffee", Type = ExampleEnum.Oldest }
      );

      var address1 = new Address { Id = 1, AddressLine1 = "test1 street 5", AddressLine2 = "2200 test1 city" };
      var address2 = new Address { Id = 2, AddressLine1 = "test2 street 7", AddressLine2 = "2200 test2 city" };

      context.Addresses.AddRange(
        address1,
        address2
      );

      var account1 = new Account { Id = 1, Name = "test1 account", Email = "test1@test1.dk", Tel = "59284756", AddressId = 1, Address = address1, CVRNumber = "10356245" };
      var account2 = new Account { Id = 2, Name = "test2 account", Email = "test2@test2.dk", Tel = "64756453", AddressId = 2, Address = address2, CVRNumber = "10356457" };

      context.Accounts.AddRange(
          account1,
          account2
      );

      context.Users.AddRange(
        new User { Id = 1, AccountId = 1, Account = account1, Email = "test1@test1.dk", Password = "Pa$$w0rd", Role = RoleEnum.Client, Name = "test1 client" },
        new User { Id = 2, AccountId = 1, Account = account1, Email = "test1accountant@test.dk", Password = "Pa$$w0rd", Role = RoleEnum.Accountant, Name = "test1 accountant" },
        new User { Id = 3, AccountId = 2, Account = account2, Email = "test2@test2.dk", Password = "Pa$$w0rd", Role = RoleEnum.Client, Name = "test2 client" }
      );

      context.SaveChanges();
    }

    public static void Destroy(ApplicationDbContext context)
    {
      context.Database.EnsureDeleted();

      context.Dispose();
    }
  }
}
