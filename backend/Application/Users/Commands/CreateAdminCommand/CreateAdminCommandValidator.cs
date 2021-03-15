using Application.Accounts.Commands.CreateAdmin;
using FluentValidation;

namespace Application.ExampleChildren.Commands.CreateAdmin
{
  public class CreateAdminCommandValidator : AbstractValidator<CreateAdminCommand>
  {
    public CreateAdminCommandValidator()
    {
      RuleFor(e => e.user)
        .NotNull();
      RuleFor(e => e.user.Email)
        .EmailAddress();
      RuleFor(e => e.user.Password)
        .NotEmpty().WithMessage("Your password cannot be empty")
        .MinimumLength(8).WithMessage("Your password length must be at least 8.")
        .Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
        .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
        .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.");
      RuleFor(e => e.user.Name)
        .NotNull()
        .MaximumLength(200);
    }
  }
}
