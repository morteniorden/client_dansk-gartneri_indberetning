using Application;
using Application.Common.Interfaces;
using Application.Common.Interfaces.Hubs;
using FluentValidation.AspNetCore;
using Infrastructure;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NSwag;
using NSwag.Generation.Processors.Security;
using Serilog;
using System.Linq;
using System.Text;
using Application.Common.Options;
using Application.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Web.DocumentProcessors;
using Web.Filters;
using Web.Hubs;
using Web.Services;

namespace Web
{
  public class Startup
  {
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
      Configuration = configuration;
      Environment = environment;
    }

    public IConfiguration Configuration { get; }

    public IWebHostEnvironment Environment { get; }
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<HashingOptions>(Configuration.GetSection(HashingOptions.Hashing));
      services.Configure<TokenOptions>(Configuration.GetSection(TokenOptions.Tokens));

      services.AddCors(options =>
      {
        options.AddPolicy("AllowAll",
                  builder =>
                  {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                  });
      });

      services.AddApplication();
      services.AddInfrastructure(Configuration, Environment);

      services.AddHttpContextAccessor();

      services.AddHealthChecks()
          .AddDbContextCheck<ApplicationDbContext>();

      services.AddControllers(options =>
                 options.Filters.Add<ApiExceptionFilterAttribute>())
          .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<IApplicationDbContext>())
          .AddNewtonsoftJson();

      // Customise default API behaviour
      services.Configure<ApiBehaviorOptions>(options =>
      {
        options.SuppressModelStateInvalidFilter = true;
      });

      services.AddOpenApiDocument(configure =>
      {
        configure.Title = "Backend API";
        configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
        {
          Type = OpenApiSecuritySchemeType.ApiKey,
          Name = "Authorization",
          In = OpenApiSecurityApiKeyLocation.Header,
          Description = "Bearer {your JWT token}."
        });

        configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
        configure.DocumentProcessors.Add(new CustomDocumentProcessor());

      });

      services.AddScoped<ICurrentUserService, CurrentUserService>();
      services.AddScoped<IAuthorizationService, AuthorizationService>();
      services.AddScoped<IExampleHubService, ExampleHubService>();
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IPasswordHasher, PasswordHasher>();
      services.AddSignalR();

      var key = Encoding.ASCII.GetBytes("VERY_SECRET_SECRET");
      services.AddAuthentication(x =>
        {
          x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(x =>
        {
          x.RequireHttpsMetadata = false;
          x.SaveToken = true;
          x.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
          };
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      //TODO Handle cors
      app.UseCors("AllowAll");

      app.UseSerilogRequestLogging();
      app.UseHealthChecks("/health");
      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSwaggerUi3(settings =>
      {
        settings.Path = "/swagger";
        settings.DocumentPath = "/swagger/specification.json";
      });

      app.UseRouting();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action=Index}/{id?}");

        endpoints.MapHub<ExampleHub>("/examplehub");
      });
    }
  }
}
