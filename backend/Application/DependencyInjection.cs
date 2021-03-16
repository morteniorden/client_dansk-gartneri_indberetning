using System;
using Application.Common.Behaviours;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Application.Common.Interfaces;
using Application.Common.Services;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.Extensions.Configuration;

namespace Application
{
  [ExcludeFromCodeCoverage]
  public static class DependencyInjection
  {
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration conf)
    {
      services.AddAutoMapper(Assembly.GetExecutingAssembly());
      services.AddMediatR(Assembly.GetExecutingAssembly());
      services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehaviour<,>));
      services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehaviour<,>));
      services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
      services.AddTransient(typeof(IPipelineBehavior<,>), typeof(PerformanceBehaviour<,>));
      services.AddTransient<IMailService, MailService>();

      services.AddHangfire(configuration => configuration
        .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
        .UseSimpleAssemblyNameTypeSerializer()
        .UseRecommendedSerializerSettings()
        .UseSqlServerStorage(conf.GetConnectionString("DefaultConnection"), new SqlServerStorageOptions
        {
          CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
          SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
          QueuePollInterval = TimeSpan.Zero,
          UseRecommendedIsolationLevel = true,
          DisableGlobalLocks = true
        }));

      services.AddHangfireServer();

      return services;
    }
  }
}
