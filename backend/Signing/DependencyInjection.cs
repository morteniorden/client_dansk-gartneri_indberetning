using Application.Common.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Diagnostics.CodeAnalysis;
using Signing.Common;

namespace Signing
{
  [ExcludeFromCodeCoverage]
  public static class DependencyInjection
  {
    public static IServiceCollection AddSigning(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddScoped<IPenneoClient, PenneoClient>();


      //TODO Add needed authentication here
      // services.AddAuthentication(options => {
      //     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
      // })
      // .AddJwtBearer(options => {
      //     ///
      // });

      return services;
    }
  }
}
