using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Options;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
namespace Web.Services
{
  public class TokenService : ITokenService
  {
    private const double EXPIRE_HOURS = 4.0;
    private const double SSO_EXPIRE_DAYS = 28.0;
    private readonly TokenOptions _options;
    private readonly IApplicationDbContext _context;
    public TokenService(IOptions<TokenOptions> options, IApplicationDbContext context)
    {
      _options = options.Value;
      _context = context;
    }
    public string CreateToken(User user)
    {
      var claims = new List<Claim>();
      claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Email));
      claims.Add(new Claim(ClaimTypes.Role, user.Role.ToString()));

      var key = Encoding.ASCII.GetBytes(_options.Secret);
      var tokenHandler = new JwtSecurityTokenHandler();
      var descriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddHours(EXPIRE_HOURS),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(descriptor);
      return tokenHandler.WriteToken(token);
    }

    public async Task<(string, string)> CreateSSOToken(User user)
    {
      var claims = new List<Claim>();
      claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Email));
      //Give the token a unique identifier
      claims.Add(new Claim("jti", Guid.NewGuid().ToString()));

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_options.Secret);
      var descriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddDays(SSO_EXPIRE_DAYS),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(descriptor);
      var writtenToken = tokenHandler.WriteToken(token);

      return (token.Id, writtenToken);
    }

    public async Task<(string, string)> ValidateSSOToken(string token)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_options.Secret);

      var claims = tokenHandler.ValidateToken(token, new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
      }, out SecurityToken validatedToken);

      var jwtToken = (JwtSecurityToken)validatedToken;
      var userEmail = claims.FindFirstValue(ClaimTypes.NameIdentifier);

      return (userEmail, validatedToken.Id);
    }
  }
}
