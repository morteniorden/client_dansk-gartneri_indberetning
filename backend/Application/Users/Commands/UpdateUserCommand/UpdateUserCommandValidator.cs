using FluentValidation;

namespace Application.Users.Commands.UpdateUserCommand
{
  public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
  {
    public UpdateUserCommandValidator()
    {
      RuleFor(e => e.User)
        .NotNull();
      RuleFor(e => e.User.Email)
        .NotEmpty()
        .EmailAddress();
      RuleFor(e => e.User.Name)
        .NotEmpty()
        .MaximumLength(200);
    }
  }
}
