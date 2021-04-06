using FluentValidation;

namespace Application.Mails.Commands.UpdateEmailCommand
{
  public class UpdateEmailCommandValidator : AbstractValidator<UpdateEmailCommand>
  {
    public UpdateEmailCommandValidator()
    {
      RuleFor(e => e.NewEmail)
        .NotNull();
    }
  }
}
