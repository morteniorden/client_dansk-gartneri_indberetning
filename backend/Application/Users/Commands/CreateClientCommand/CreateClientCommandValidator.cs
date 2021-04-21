using System.Data;
using FluentValidation;

namespace Application.Users.Commands.CreateClientCommand
{
  public class CreateClientCommandValidator : AbstractValidator<CreateClientCommand>
  {
    public CreateClientCommandValidator()
    {
      RuleFor(e => e.ClientDto)
        .NotNull();
      RuleFor(e => e.ClientDto.Email)
        .NotNull()
        .EmailAddress();
      RuleFor(e => e.ClientDto.Name)
        .NotNull()
        .MaximumLength(200);
      RuleFor(e => e.ClientDto.Tel)
        .MinimumLength(8)
        .NotNull();
      RuleFor(e => e.ClientDto.CVRNumber)
        .MinimumLength(8)
        .NotNull();
    }
  }
}
