# Open AI & W3C Verifiable Credentials 

🚧 Experimental 🏗️. 

<!-- [![Demo](https://github.com/transmute-industries/vc-open-ai/actions/workflows/demo.yml/badge.svg)](https://github.com/transmute-industries/vc-open-ai/actions/workflows/demo.yml) -->

[![CI](https://github.com/transmute-industries/vc-open-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/transmute-industries/vc-open-ai/actions/workflows/ci.yml)
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)

<!-- [![NPM](https://nodei.co/npm/@transmute/vc-open-ai.png?mini=true)](https://npmjs.org/package/@transmute/vc-open-ai) -->

<img src="./transmute-banner.png" />

#### [Questions? Contact Transmute](https://transmute.typeform.com/to/RshfIw?typeform-source=vc-open-ai)

```yml
name: Demo
on: workflow_dispatch
jobs:
  demo:
    runs-on: ubuntu-latest
    steps:
      - name: Summarize a Verifiable Credential
        uses: transmute-industries/vc-open-ai@v0.0.1
        id: summarize
        with:
          api-key: ${{ secrets.OPENAI_API_KEY }}
          operation: summary
          # https://w3id.org/traceability#GS1KeyCredential
          document: |
            {
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
            }
      - name: Review the summary
        run: |-
          echo '${{ steps.summary.outputs.json }}' >> summary.json;
          cat ./summary.json | jq
```

```json
 {
  "document": {
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
  },
  "text": {
    "prompt": "Summarize this for a second-grade student:\n  A revocable GS1KeyCredential issued by did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U 2 years ago, describing https://id.gs1.org/01/07541234555551\n  ",
    "text": "A GS1KeyCredential is a type of credential that can be issued by did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U. This credential is revocable, which means that it can be cancelled by the issuer if they need to. The credential is also valid for two years."
  },
  "image": {
    "prompt": "A cyberpunk painting of the concept of a revocable GS1KeyCredential issued by did:key:z6MktHQo3fRRohk44dsbE76CuiTpBmyMWq2VVjvV6aBSeE3U 2 years ago, describing https://id.gs1.org/01/07541234555551\n  ",
    "response": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-..."
  }
}
```

<img src="./img-5UTGHiIXgenetkbtauQk7anK.png" alt="Open AI generated image from a W3C Verifiable Credential"/>
<img src="./img-zCJxKTRR18nt6hcrRChegegT.png" alt="Open AI generated image from a W3C Verifiable Credential"/>

## Develop

```bash
npm i
npm t
```