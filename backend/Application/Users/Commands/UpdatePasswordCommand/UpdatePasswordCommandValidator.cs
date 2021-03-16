using FluentValidation;

namespace Application.Users.Commands.UpdatePassword
{
  public class UpdatePasswordValidator : AbstractValidator<UpdatePasswordCommand>
  {
    public UpdatePasswordValidator()
    {
      RuleFor(e => e.Id)
        .NotEmpty();
      RuleFor(e => e.NewPassword)
        .NotEmpty().WithMessage("Your password cannot be empty")
        .MinimumLength(8).WithMessage("Your password length must be at least 8.")
        .Matches(@"[A-Z]+").WithMessage("Your password must contain at least one uppercase letter.")
        .Matches(@"[a-z]+").WithMessage("Your password must contain at least one lowercase letter.")
        .Matches(@"[0-9]+").WithMessage("Your password must contain at least one number.");
    }
  }
}
