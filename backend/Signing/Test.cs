namespace Signing.Common
{
  public class Test {
    private readonly PenneoConnector connector;

    public Test()
    {
      connector = new PenneoConnector(key, secret, endpoint);
    }

    public void signString() {
      var myCaseFile = new CaseFile("Demo case file");
      myCaseFile.Persist(connector);

      var myDocument = new Document(myCasefile, "Demo Document", "/path/to/pdfFile");
      myDocument.MakeSignable();
      myDocument.Persist(connector);
    }
  }
}
