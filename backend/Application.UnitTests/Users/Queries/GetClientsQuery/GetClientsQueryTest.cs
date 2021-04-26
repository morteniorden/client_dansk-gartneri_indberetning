using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Users;
using Application.Users.Queries.GetClientsQuery;
using Xunit;

namespace Application.UnitTests.Users.Queries.GetClients
{
  [Collection("QueryTests")]
  public class GetClientsQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClientsQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndClientsCount()
    {
      var query = new GetClientsQuery();

      var handler = new GetClientsQuery.GetClientsQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ClientDto>>();
      result.Count.Should().Be(2);
    }

    [Fact]
    public async Task Handle_ReturnsCorrectClientsData()
    {
      var query = new GetClientsQuery();

      var handler = new GetClientsQuery.GetClientsQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ClientDto>>();

      result.ForEach(entity =>
      {
        entity.Email.Should().NotBeNullOrEmpty();
        entity.Name.Should().NotBeNullOrEmpty();
        entity.Role.Should().NotBeNull();
      });
    }
  }
}
