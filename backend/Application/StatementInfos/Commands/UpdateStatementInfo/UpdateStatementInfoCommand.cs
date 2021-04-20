using System;
using System.Linq;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;

namespace Application.StatementInfos.Commands.UpdateStatementÍnfo
{
  public class UpdateStatementInfoCommand : IRequest
  {
    [JsonIgnore]
    public int AccountingYear { get; set; }
    public StatementInfoDto NewInfo { get; set; }


    public class UpdateStatementInfoCommandHandler : IRequestHandler<UpdateStatementInfoCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public UpdateStatementInfoCommandHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }

      public async Task<Unit> Handle(UpdateStatementInfoCommand request, CancellationToken cancellationToken)
      {
        var statementInfo = await _context.StatementInfo
          .Where(e => e.AccountingYear == request.AccountingYear && e.Id == request.NewInfo.Id)
          .FirstOrDefaultAsync(cancellationToken);

        if (statementInfo == null)
        {
          throw new NotFoundException(nameof(StatementInfo), request.AccountingYear);
        }

        if (request.NewInfo.AccountingYear != null && request.NewInfo.AccountingYear != request.AccountingYear)
        {
          throw new ArgumentException("The accounting year of the provided statement info doesn't match the accounting year of the query parameter.");
        }

        //Use automapper to update values on entity from the dto.
        _mapper.Map(request.NewInfo, statementInfo);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
