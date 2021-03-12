using Infrastructure.Persistence;
using System;
using Application.Common.Interfaces;
using Moq;

namespace Application.UnitTests
{
  public class CommandTestBase : IDisposable
  {
    public Mock<IPasswordHasher> passwordHasherMock;

    public CommandTestBase()
    {
      Context = ApplicationDbContextFactory.Create();
      passwordHasherMock = new Mock<IPasswordHasher>();
      passwordHasherMock.Setup(m => m.Hash("password"))
        .Returns("Password123");
      passwordHasherMock.Setup(m => m.Check("password", "password")).Returns((true, false));
    }

    public ApplicationDbContext Context { get; }

    public void Dispose()
    {
      ApplicationDbContextFactory.Destroy(Context);
    }
  }
}
