using Application.Accounts.Queries.GetAccountsQuery;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Users;
using Application.Users.Queries.GetAdminsQuery;
using Xunit;

namespace Application.UnitTests.Users.Queries.GetAdmins
{
  [Collection("QueryTests")]
  public class GetAdminsQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAdminsQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndAdminsCount()
    {
      var query = new GetAdminsQuery();

      var handler = new GetAdminsQuery.GetAdminsQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<UserDto>>();
      result.Count.Should().Be(3);
    }
  }
}
