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

namespace Application.Statements.Queries.GetStatementsCSVQuery
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
        var statements = await _context.Statements
          .Where(e => (request.AccountingYear == null || e.AccountingYear == request.AccountingYear) && e.Status == StatementStatus.SignedOff)
          .Include(e => e.Client)
          .Include(e => e.Accountant)
          .ProjectTo<StatementCSVDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        byte[] bin;
        using (MemoryStream stream = new MemoryStream())
        {
          using (var writer = new StreamWriter(stream))
          using (var csv = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture)
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
