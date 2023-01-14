
const contexts = require('./bundled-contexts');

const documentLoader = async (iri) => {
  if (contexts[iri]){
    return { document: contexts[iri] };
  }
  console.log(`documentLoader("${iri}")`)
  throw new Error('Document Loader does not support IRI: ' + iri)
}

module.exports = documentLoader;