using FluentValidation;

namespace Application.Mails.Commands.SendResetPasswordMailCommand
{
  public class SendResetPasswordCommandValidator : AbstractValidator<SendResetPasswordCommand>
  {
    public SendResetPasswordCommandValidator()
    {
      RuleFor(e => e.Email)
        .NotEmpty()
        .EmailAddress();
    }
  }
}
