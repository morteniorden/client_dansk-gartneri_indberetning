using Application.Accounts.Commands.CreateAdmin;
using FluentValidation;

namespace Application.ExampleChildren.Commands.CreateAdmin
{
  public class CreateAdminCommandValidator : AbstractValidator<CreateAdminCommand>
  {
    public CreateAdminCommandValidator()
    {
      RuleFor(e => e.Admin)
        .NotNull();
      RuleFor(e => e.Admin.Email)
        .EmailAddress();
      RuleFor(e => e.Admin.Password)
        .NotEmpty().WithMessage("Your password cannot be empty")
        .MinimumLength(8).WithMessage("Your password length must be at least 8.")
        .Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
        .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
        .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.");
      RuleFor(e => e.Admin.Name)
        .NotNull()
        .MaximumLength(200);
    }
  }
}
