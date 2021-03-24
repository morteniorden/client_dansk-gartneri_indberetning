namespace Application.Common.Options
{
  public class MailOptions
  {
    public const string MailSettings = "MailSettings";
    public string Mail { get; set; }
    public string DisplayName { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Host { get; set; }
    public int Port { get; set; }
    public string baseUrl { get; set; }
    public string DevelopmentRecipient { get; set; }
  }
}
