namespace Application.Statements
{
  public class StatementAndConsentDto
  {
    public StatementDto Statement { get; set; }
    public byte[] ConsentStream { get; set; }
  }
}
