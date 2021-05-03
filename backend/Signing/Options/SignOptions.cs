namespace Signing.Options
{
  public class SignOptions
  {
    public static string SignOptionsKey { get; } = "SignOptions";

    public string Key { get; set; }
    public string Secret { get; set; }
    public string Endpoint { get; set; }
  }

}
