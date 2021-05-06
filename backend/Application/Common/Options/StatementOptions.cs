
namespace Application.Common.Options
{
  public class StatementOptions
  {
    public const string Statements = "Statements";
    public int LimitForRequiredAccountant { get; set; }
    public string SigningSuccessUrl { get; set; }
    public string SigningFailureUrl { get; set; }
  }
}
