namespace Application.Statements
{
  public class StandardSignDTO
  {
    public string DocPath { get; set; }

    public string SignerName { get; set; }
    public string SignerCompany { get; set; }

    public string RequestSuccessUrl { get; set; }
    public string RequestFailureUrl { get; set; }

  }
}
