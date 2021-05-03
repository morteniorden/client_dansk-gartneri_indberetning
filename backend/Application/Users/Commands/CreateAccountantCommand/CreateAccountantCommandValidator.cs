using FluentValidation;

namespace Application.Users.Commands.CreateAccountantCommand
{
  public class CreateAccountantCommandValidator : AbstractValidator<CreateAccountantCommand>
  {
    public CreateAccountantCommandValidator()
    {
      RuleFor(e => e.Dto)
        .NotNull();
      RuleFor(e => e.Dto.Email)
        .NotEmpty()
        .EmailAddress();
    }
  }
}
