using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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
        System.Collections.Generic.List<StatementCSVDto> statements = await _context.Statements
          .Where(e => (request.AccountingYear == null || e.AccountingYear == request.AccountingYear) && e.Status == StatementStatus.SignedOff)
          .Include(e => e.Client)
          .Include(e => e.Accountant)
          .ProjectTo<StatementCSVDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        string pattern = @"^s\d_";
        foreach (StatementCSVDto statement in statements)
        {
          foreach (System.Reflection.PropertyInfo property in statement.GetType().GetProperties())
          {
            // Regex to check whether the property starts with "s<number>_" which only the values that must be negated does
            if (!Regex.IsMatch(property.Name, pattern))
            {
              continue;
            }

            int value = (int)property.GetValue(statement);
            property.SetValue(statement, value * -1);
          }
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
