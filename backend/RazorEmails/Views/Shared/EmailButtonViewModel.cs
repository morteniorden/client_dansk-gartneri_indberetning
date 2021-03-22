namespace RazorEmails.Views.Shared
{
  public class EmailButtonViewModel
  {
    public string Text { get; set; }
    public string Url { get; set; }
    public EmailButtonViewModel(string text, string url)
    {
      Text = text;
      Url = url;
    }
  }
}
