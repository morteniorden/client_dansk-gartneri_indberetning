using System;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using Domain.Enums;

namespace Application.Statements.Commands.UpdateStatement
{
  [Authenticated]
  public class UpdateStatementCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public StatementDto statementDto { get; set; }

    public class UpdateStatementCommandHandler : IRequestHandler<UpdateStatementCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUser;

      public UpdateStatementCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
      {
        _context = context;
        _currentUser = currentUser;
      }

      public async Task<Unit> Handle(UpdateStatementCommand request, CancellationToken cancellationToken)
      {
        var statementEntity = await _context.Statements.FindAsync(request.Id);

        if (statementEntity == null)
        {
          throw new NotFoundException(nameof(Statement), request.Id);
        }

        if (!await _context.Accounts.AnyAsync(e => e.Id == request.statementDto.AccountId, cancellationToken))
        {
          throw new NotFoundException(nameof(Account), request.statementDto.AccountId);
        }

        if (statementEntity.Status == StatementStatus.SignedOff)
        {
          throw new InvalidOperationException("Cannot update a statement that is already signed off.");
        }

        var currentUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == _currentUser.UserId);
        if (statementEntity.AccountId != currentUser.AccountId)
        {
          throw new UnauthorizedAccessException("Tried to update a statement that belongs to another account");
        }

        statementEntity.s1_boughtPlants = request.statementDto.s1_boughtPlants;
        statementEntity.s1_mushrooms = request.statementDto.s1_mushrooms;
        statementEntity.s1_tomatoCucumberHerb = request.statementDto.s1_tomatoCucumberHerb;

        statementEntity.s3_boughtPlants = request.statementDto.s3_boughtPlants;
        statementEntity.s3_carrots = request.statementDto.s3_carrots;
        statementEntity.s3_onions = request.statementDto.s3_onions;
        statementEntity.s3_other = request.statementDto.s3_other;
        statementEntity.s3_peas = request.statementDto.s3_peas;

        statementEntity.s4_boughtPlants = request.statementDto.s4_boughtPlants;
        statementEntity.s4_cutFlowers = request.statementDto.s4_cutFlowers;
        statementEntity.s4_onions = request.statementDto.s4_onions;
        statementEntity.s4_plants = request.statementDto.s4_plants;

        statementEntity.s7_boughtPlants = request.statementDto.s7_boughtPlants;
        statementEntity.s7_plants = request.statementDto.s7_plants;

        statementEntity.s8_applesPearsEtc = request.statementDto.s8_applesPearsEtc;
        statementEntity.s8_cherries = request.statementDto.s8_cherries;
        statementEntity.s8_currant = request.statementDto.s8_currant;
        statementEntity.s8_otherBerryFruit = request.statementDto.s8_otherBerryFruit;
        statementEntity.s8_otherStoneFruit = request.statementDto.s8_otherStoneFruit;
        statementEntity.s8_packaging = request.statementDto.s8_packaging;
        statementEntity.s8_plums = request.statementDto.s8_plums;
        statementEntity.s8_strawberries = request.statementDto.s8_strawberries;

        statementEntity.LastModified = DateTimeOffset.Now;
        statementEntity.Status = StatementStatus.InvitedAndEdited;

        _context.Statements.Update(statementEntity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
