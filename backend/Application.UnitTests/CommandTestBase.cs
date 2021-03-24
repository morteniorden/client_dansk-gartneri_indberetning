using Infrastructure.Persistence;
using System;
using Application.Common.Interfaces;
using Hangfire;
using Microsoft.AspNetCore.Http;
using Moq;
using IBackgroundJobClient = Hangfire.IBackgroundJobClient;

namespace Application.UnitTests
{
  public class CommandTestBase : IDisposable
  {
    public Mock<IPasswordHasher> PasswordHasherMock;
    public Mock<IHttpContextAccessor> AccessorMock;
    public Mock<ITokenService> TokenServiceMock;
    public Mock<IMailService> MailServiceMock;
    public Mock<IBackgroundJobClient> BackGroundJobClientMock;


    public CommandTestBase()
    {
      Context = ApplicationDbContextFactory.Create();
      PasswordHasherMock = new Mock<IPasswordHasher>();
      PasswordHasherMock.Setup(m => m.Hash("password"))
        .Returns("password");
      PasswordHasherMock.Setup(m => m.Check("password", "password")).Returns((true, false));

      AccessorMock = new Mock<IHttpContextAccessor>();
      AccessorMock.Setup(req => req.HttpContext.Request.Host).Returns(new HostString("localhost", 3000));

      TokenServiceMock = new Mock<ITokenService>();

      MailServiceMock = new Mock<IMailService>();

      BackGroundJobClientMock = new Mock<IBackgroundJobClient>();
    }

    public ApplicationDbContext Context { get; }

    public void Dispose()
    {
      ApplicationDbContextFactory.Destroy(Context);
    }
  }
}
