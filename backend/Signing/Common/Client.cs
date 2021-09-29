using System.Collections.Generic;
using Application.Common.Interfaces;
using Microsoft.Extensions.Options;

using Penneo;
using Signing.Options;
using Application.Statements;

namespace Signing.Common
{
  public class PenneoClient : IPenneoClient
  {
    private PenneoConnector connector;

    private readonly SignOptions options;

    public PenneoClient(IOptions<SignOptions> options)
    {
      this.options = options.Value;
    }

    public void StartConnection()
    {
      connector = new PenneoConnector(options.Key, options.Secret, options.Endpoint);
    }

    // We need two signature - one for the document and one for the form in general.
    // With the form we sign a default document.

    public (string, int?) SignDoc(StandardSignDTO dto)
    {
      var myCaseFile = new CaseFile("Demo case file");
      myCaseFile.Persist(connector);

      var myDocument = new Document(myCaseFile, "Demo Document", dto.DocPath);
      myDocument.MakeSignable();
      myDocument.Persist(connector);

      //! Signer
      var signer = new Signer(myCaseFile, dto.SignerName);
      signer.OnBehalfOf = dto.SignerCompany;
      // signer.SocialSecurityNumber = "0101501111";
      signer.Persist(connector);

      //! Signature Line
      var sigLine = new SignatureLine(myDocument, "dummy-signer-role", 0);

      sigLine.Persist(connector);
      sigLine.SetSigner(connector, signer);

      var signingRequest = signer.GetSigningRequest(connector);

      signingRequest.Email = "john@doe.com"; //! NOTE: this is only for test as we  don't know if the receipt is needed
      signingRequest.EmailSubject = "Contract for signing";

      signingRequest.EnableInsecureSigning = true; //! NOTE: Allows fingerprint signing with penneo app.

      signingRequest.SuccessUrl = dto.RequestSuccessUrl;
      signingRequest.FailUrl = dto.RequestFailureUrl;

      signingRequest.Persist(connector);

      myCaseFile.Send(connector);

      var link = signingRequest.GetLink(connector);

      signingRequest.Send(connector);

      return (link, myCaseFile.Id);
    }

    public bool IsCaseFileSigned(int id)
    {
      var query = new Query(connector);
      var myCaseFile = query.Find<CaseFile>(id);
      return myCaseFile.GetStatus() == CaseFile.CaseFileStatus.Signed || myCaseFile.GetStatus() == CaseFile.CaseFileStatus.Completed;
    }
  }
}
