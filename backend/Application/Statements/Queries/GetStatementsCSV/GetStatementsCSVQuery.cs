using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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


      private readonly string SEPERATOR = ";";
      private readonly string NEWLINE = "\n";
      public async Task<CSVResponseDto> Handle(GetStatementsCSVQuery request, CancellationToken cancellationToken)
      {
        //Find all signed-off statements of the provided accounting year, or all if no year is provided
        var statements = await _context.Statements
          .Where(e => (request.AccountingYear == null || e.AccountingYear == request.AccountingYear) && e.Status == StatementStatus.SignedOff)
          .Include(e => e.Client)
          .Include(e => e.Accountant)
          .ProjectTo<StatementCSVDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        //Find display names of properties on dto and construct comma-seperated string of the table keys
        var propNames = typeof(StatementCSVDto).GetProperties().Select(property =>
        {
          var displayName = property.GetCustomAttributes(typeof(DisplayNameAttribute), false)
            .Cast<DisplayNameAttribute>()
            .SingleOrDefault()?.DisplayName;
          if (displayName != null) return displayName;
          return property.Name;
        });
        var colHeadersString = string.Join(SEPERATOR, propNames);

        //Construct list of comma-seperated strings of all the given statements
        var rows = statements.Select(statement =>
        {
          var rowData = typeof(StatementCSVDto).GetProperties().Select(prop => prop.GetValue(statement, null)?.ToString() ?? "");
          var rowString = string.Join(SEPERATOR, rowData);
          return rowString;
        });

        //Prepend the table keys to the data and join to single string. Choose filename, and return the results
        string csv = string.Join(NEWLINE, colHeadersString, rows);
        string fileName = request.AccountingYear != null
          ? "oplysningsskemaer_" + request.AccountingYear + ".csv"
          : "oplysningsskemaer_alle.csv";

        return new CSVResponseDto { FileName = fileName, Content = csv };
      }
    }
  }
}
