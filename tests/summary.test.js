const adapter = require('../src/adapter');

jest.setTimeout(20 * 1000);

describe.skip("summary", () => {
  // https://w3id.org/traceability#GS1KeyCredential
  it("text", async () => {
    const response = await adapter.operationSwitch({
      apiKey: process.env.OPENAI_API_KEY,
      operation: 'summary',
      document: `${JSON.stringify({
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://ref.gs1.org/gs1/vc/licence-context/",
          "https://w3id.org/vc/status-list/2021/v1"
        ],
        "id": "did:example:60cda318-a0a7-4e39-b600-ea38bf68a31f",
        "type": [
          "VerifiableCredential",
          "GS1KeyCredential"
        ],
        "issuer": "did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U",
        "issuanceDate": "2020-12-02T09:48:11Z",
        "credentialSubject": {
          "id": "https://id.gs1.org/01/07541234555551",
          "extendsCredential": "did:example:b6d13abe-464d-4bb9-a568-b6d81efd57e3"
        },
        "credentialStatus": {
          "id": "https://www.example.com/mycreds/status/60cda318-a0a7-4e39-b600-ea38bf68a31f",
          "type": "StatusList2021Credential"
        },
        "proof": {
          "type": "Ed25519Signature2018",
          "created": "2023-01-03T11:29:14Z",
          "verificationMethod": "did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U#z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U",
          "proofPurpose": "assertionMethod",
          "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..HZtoLHUCGXalQH8VPClh0TcsQeNKS5i9KWLyASTQYfPIUPDMnLnjgjPJ5TVCn7S4CV7i45aTsUWkfs6cBNntBQ"
        }
      }, null, 2)}`
    });
    // console.log(JSON.stringify(response, null, 2))
    expect(response.document).toBeDefined()
    expect(response.text).toBeDefined()
    expect(response.image).toBeDefined()
  });
});
