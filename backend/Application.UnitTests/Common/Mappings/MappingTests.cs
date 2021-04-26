using AutoMapper;
using Domain.Entities;
using System;
using Application.Accounts;
using Application.Statements;
using Application.Users;
using Xunit;

namespace Application.UnitTests.Common.Mappings
{
  public class MappingTests : IClassFixture<MappingTestsFixture>
  {
    private readonly IConfigurationProvider _configuration;
    private readonly IMapper _mapper;

    public MappingTests(MappingTestsFixture fixture)
    {
      _configuration = fixture.ConfigurationProvider;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public void ShouldHaveValidConfiguration()
    {
      _configuration.AssertConfigurationIsValid();
    }

    [Theory]
    [InlineData(typeof(Accountant), typeof(AccountantDto))]
    [InlineData(typeof(Client), typeof(ClientDto))]
    [InlineData(typeof(Admin), typeof(UserDto))]
    [InlineData(typeof(Address), typeof(AddressDto))]
    [InlineData(typeof(Statement), typeof(StatementDto))]
    public void ShouldSupportMappingFromSourceToDestination(Type source, Type destination)
    {
      var instance = Activator.CreateInstance(source);

      _mapper.Map(instance, source, destination);
    }

  }
}
