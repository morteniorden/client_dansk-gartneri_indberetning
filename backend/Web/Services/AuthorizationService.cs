using Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System;
using Domain.Enums;

namespace Web.Services
{
  public class AuthorizationService : IAuthorizationService
  {
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthorizationService(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public bool IsInRole(RoleEnum role)
    {
      return role.ToString().Equals( _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Role));
    }

    public bool HasPolicy(string policyName)
    {
      throw new NotImplementedException();
    }
    
  }
}
