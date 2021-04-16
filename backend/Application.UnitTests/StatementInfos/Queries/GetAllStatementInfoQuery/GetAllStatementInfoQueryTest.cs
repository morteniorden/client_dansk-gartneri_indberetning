using Application.ExampleChildren;
using Application.ExampleChildren.Queries.GetExampleChildren;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.StatementInfos;
using Application.StatementInfos.Queries.GetStatementInfos;
using Moq;
using Xunit;

namespace Application.UnitTests.StatementInfos.Queries.GetAllStatementInfo
{
  [Collection("QueryTests")]
  public class GetAllStatementInfoQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private Mock<IStatementInfoService> infoServiceMock;

    public GetAllStatementInfoQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      infoServiceMock = new Mock<IStatementInfoService>();
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndExampleChildrenCount()
    {
      var query = new GetAllStatementInfoQuery();

      var handler = new GetAllStatementInfoQuery.GetAllStatementInfoQueryHandler(_context, _mapper, infoServiceMock.Object);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<StatementInfoDto>>();
      result.Count.Should().Be(2);
    }
  }
}
