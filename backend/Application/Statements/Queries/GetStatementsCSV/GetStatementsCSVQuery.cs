using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CsvHelper;
using CsvHelper.Configuration;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Statements.Queries.GetStatementsCSV
{
  [Authorize(Role = RoleEnum.Admin)]
  public class GetStatementsCSVQuery : IRequest<CSVResponseDto>
  {
    public int? AccountingYear { get; set; }

    public class GetStatementsCSVQueryHandler : IRequestHandler<GetStatementsCSVQuery, CSVResponseDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetStatementsCSVQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }

      public async Task<CSVResponseDto> Handle(GetStatementsCSVQuery request, CancellationToken cancellationToken)
      {
        //Find all signed-off statements of the provided accounting year, or all if no year is provided
        List<StatementCSVDto> statements = await _context.Statements
          .Where(e => (request.AccountingYear == null || e.AccountingYear == request.AccountingYear) && e.Status == StatementStatus.SignedOff)
          .Include(e => e.Client)
          .Include(e => e.Accountant)
          .ProjectTo<StatementCSVDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        foreach (StatementCSVDto statement in statements)
        {
          statement.s1_boughtPlants *= -1;
          statement.s1_mushrooms *= -1;
          statement.s1_tomatoCucumberHerb *= -1;

          statement.s3_boughtPlants *= -1;
          statement.s3_carrots *= -1;
          statement.s3_onions *= -1;
          statement.s3_other *= -1;
          statement.s3_peas *= -1;

          statement.s4_boughtPlants *= -1;
          statement.s4_cutFlowers *= -1;
          statement.s4_onions *= -1;
          statement.s4_plants *= -1;

          statement.s7_boughtPlants *= -1;
          statement.s7_plants *= -1;

          statement.s8_applesPearsEtc *= -1;
          statement.s8_cherries *= -1;
          statement.s8_currant *= -1;
          statement.s8_otherBerryFruit *= -1;
          statement.s8_otherStoneFruit *= -1;
          statement.s8_packaging *= -1;
          statement.s8_plums *= -1;
          statement.s8_strawberries *= -1;
        }

        byte[] bin;
        using (MemoryStream stream = new())
        {
          using (StreamWriter writer = new(stream))
          using (CsvWriter csv = new(writer, new CsvConfiguration(CultureInfo.InvariantCulture)
          {
            Encoding = Encoding.UTF8,
            Delimiter = ";"
          }))
          {
            csv.WriteRecords(statements);
          }
          bin = stream.ToArray();
        }

        string fileName = request.AccountingYear != null
          ? "oplysningsskemaer_" + request.AccountingYear + ".csv"
          : "oplysningsskemaer_alle.csv";

        return new CSVResponseDto { FileName = fileName, Content = bin };
      }
    }
  }
}
