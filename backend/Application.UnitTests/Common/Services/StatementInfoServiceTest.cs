using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace Application.UnitTests.Common.Services
{
  [Collection("QueryTests")]
  public class StatementInfoServiceTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public StatementInfoServiceTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndExampleChildrenCount()
    {
      _context.StatementInfo.Count().Should().Be(2);

      IStatementInfoService service = new StatementInfoService(_context);

      var lastInfo = await _context.StatementInfo
        .Where(e => e.AccountingYear == _context.StatementInfo.Max(y => y.AccountingYear))
        .FirstOrDefaultAsync();

      await service.CheckThisYearInfo();

      _context.StatementInfo.Count().Should().Be(3);

      var newInfo = await _context.StatementInfo
        .Where(e => e.AccountingYear == _context.StatementInfo.Max(y => y.AccountingYear))
        .FirstOrDefaultAsync();

      newInfo.AccountingYear.Should().BeGreaterThan(lastInfo.AccountingYear);
      newInfo.s1_boughtPlants_help.Should().Be(lastInfo.s1_boughtPlants_help);
      newInfo.s1_boughtPlants_permille.Should().Be(lastInfo.s1_boughtPlants_permille);
      newInfo.s1_mushrooms_help.Should().Be(lastInfo.s1_mushrooms_help);
      newInfo.s1_mushrooms_permille.Should().Be(lastInfo.s1_mushrooms_permille);
      //and so on..
    }
  }
}
