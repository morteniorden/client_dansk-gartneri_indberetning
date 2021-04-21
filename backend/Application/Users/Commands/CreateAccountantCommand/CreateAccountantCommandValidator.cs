using FluentValidation;

namespace Application.Users.Commands.CreateAccountantCommand
{
  public class CreateAccountantCommandValidator : AbstractValidator<CreateAccountantCommand>
  {
    public CreateAccountantCommandValidator()
    {
      RuleFor(e => e.AccountantDto)
        .NotNull();
      RuleFor(e => e.AccountantDto.Email)
        .NotEmpty()
        .EmailAddress();
      RuleFor(e => e.AccountantDto.Name)
        .NotEmpty()
        .MaximumLength(200);
      RuleFor(e => e.AccountantDto.AccountantType)
        .NotEmpty();
    }
  }
}
