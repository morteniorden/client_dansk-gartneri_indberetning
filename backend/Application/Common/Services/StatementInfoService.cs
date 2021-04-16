using System;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Services
{
  public class StatementInfoService : IStatementInfoService
  {
    private readonly IApplicationDbContext _context;

    public StatementInfoService(IApplicationDbContext context)
    {
      _context = context;
    }

    public async Task CheckThisYearInfo(int year = -1)
    {
      var thisYear = year == -1 ? DateTimeOffset.Now.Year : year;

      //Check if this year has a StatementInfo entity
      var thisYearInfo = await _context.StatementInfo
        .Where(e => e.AccountingYear == thisYear)
        .FirstOrDefaultAsync();

      //If not, create one
      if (thisYearInfo == null)
      {
        //Get last years info
        var lastYearInfo = await _context.StatementInfo
          .Where(e => e.AccountingYear == _context.StatementInfo.Max(y => y.AccountingYear))
          .FirstOrDefaultAsync();

        var newYearInfo = new StatementInfo();

        if (lastYearInfo != null)
          //Copy value of each prop on last years info to this years info.
          foreach (PropertyInfo prop in typeof(StatementInfo).GetProperties())
          {
            if (prop.Name == "Id") continue;
            var previousValue = prop.GetValue(lastYearInfo, null);
            prop.SetValue(newYearInfo, previousValue);
          }
        //Set year to this year
        newYearInfo.AccountingYear = thisYear;

        _context.StatementInfo.Add(newYearInfo);
        _context.SaveChanges();
      }
    }
  }
}
