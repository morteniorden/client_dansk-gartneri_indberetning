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
      var address1 = new Address { Id = 1, AddressLine1 = "test1 street 5", AddressLine2 = "2200 test1 city" };
      var address2 = new Address { Id = 2, AddressLine1 = "test2 street 7", AddressLine2 = "2200 test2 city" };

      context.Addresses.AddRange(
        address1,
        address2
      );

      context.Users.AddRange(
        new Client { Id = 1, Email = "test1@test1.dk", Password = "Pa$$w0rd", Name = "test1 client" },
        new Accountant { Id = 2, Email = "test1accountant@test.dk", Password = "Pa$$w0rd", Name = "test1 accountant" },
        new Client { Id = 3, Email = "test2@test2.dk", Password = "Pa$$w0rd", Name = "test2 client" },
        new Admin { Id = 4, Email = "admin1@admin.dk", Password = "Pa$$w0rd", Name = "Admin" },
        new Admin { Id = 5, Email = "admin2@admin.dk", Password = "Pa$$w0rd", Name = "Admin" },
        new Admin { Id = 6, Email = "admin3@admin.dk", Password = "Pa$$w0rd", Name = "Admin" }
      );

      context.Statements.AddRange(
        new Statement { Id = 1, AccountingYear = 2021, ClientId = 1 },
        new Statement { Id = 2, AccountingYear = 2022, ClientId = 3 }
        );

      context.Statements.AddRange(
        new Statement { Id = 1, AccountId = 1, Account = account1, Status = StatementStatus.InvitedNotEdited, IsApproved = false, RevisionYear = 2021},
        new Statement { Id = 2, AccountId = 1, Account = account1, Status = StatementStatus.InvitedAndEdited, IsApproved = true, RevisionYear = 2020 },
        new Statement { Id = 3, AccountId = 1, Account = account1, Status = StatementStatus.SignedOff, IsApproved = false, RevisionYear = 2019 },
        new Statement { Id = 4, AccountId = 2, Account = account2, Status = StatementStatus.InvitedAndEdited, IsApproved = false, RevisionYear = 2021 },
        new Statement { Id = 5, AccountId = 2, Account = account2, Status = StatementStatus.InvitedAndEdited, IsApproved = true, RevisionYear = 2020 },
        new Statement { Id = 6, AccountId = 2, Account = account2, Status = StatementStatus.InvitedAndEdited, IsApproved = false, RevisionYear = 2019, s1_mushrooms = 10000000},
        new Statement { Id = 7, AccountId = 1, Account = account1, Status = StatementStatus.InvitedAndEdited, IsApproved = true, RevisionYear = 2018, s1_mushrooms = 10000000 }
      );

      context.SaveChanges();

      //foreach (var entity in context.ChangeTracker.Entries())
      //{
      //  entity.State = EntityState.Detached;
      //}
    }

    public static void Destroy(ApplicationDbContext context)
    {
      context.Database.EnsureDeleted();

      context.Dispose();
    }
  }
}
