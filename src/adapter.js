const moment = require('moment');
const { Configuration, OpenAIApi } = require("openai");
const getTextSummary = async (openai, document) =>{
  const d = document;
  // extremely naive.... needs prompts induction.
  const prompt = `Summarize this for a second-grade student:
  A ${d.credentialStatus ? 'revocable': 'unrevocable'} ${d.type.pop()} issued by ${d.issuer.name || d.issuer.id || d.issuer} ${moment(d.issuanceDate).fromNow()}, describing ${d.credentialSubject.id}
  `
  const response = await openai.createCompletion( {
    model: "text-davinci-002", 
    prompt,
    temperature: 0.3,
    max_tokens: 120,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return { prompt, text: response.data.choices[0].text.trim() };
   // {
  //   "id": "cmpl-6YgYeA5OClkhY66sTlnNNdAO1mIzd",
  //   "object": "text_completion",
  //   "created": 1673724764,
  //   "model": "text-davinci-002",
  //   "choices": [
  //     {
  //       "text": "\n\nA GS1KeyCredential is a credential issued by a company",
  //       "index": 0,
  //       "logprobs": null,
  //       "finish_reason": "length"
  //     }
  //   ],
  //   "usage": {
  //     "prompt_tokens": 90,
  //     "completion_tokens": 16,
  //     "total_tokens": 106
  //   }
  // } 
}

const getImageSummary = async (openai, document) =>{
  const d = document;
  // extremely naive.... needs prompts induction.
  const prompt = `A cyberpunk painting of the concept of a ${d.credentialStatus ? 'revocable': 'unrevocable'} ${d.type.pop()} issued by ${d.issuer.name || d.issuer.id || d.issuer} ${moment(d.issuanceDate).fromNow()}, describing ${d.credentialSubject.id}`
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "256x256",
  });
  return {prompt, response: response.data.data[0].url} 
  // {
  //     "created": 1673725055,
  //     "data": [
  //       {
  //         "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-..."
  //       }
  //     ]
  //   }
  // }
}

const summaryOperation = async (env) =>{
  const openai = new OpenAIApi(new Configuration({
    apiKey: env.apiKey,
  }));
  const text = await getTextSummary(openai, JSON.parse(env.document))
  const image = await getImageSummary(openai, JSON.parse(env.document))
  return {
    document: JSON.parse(env.document),
    text,
    image
  }
}

const operation = {
  summary: summaryOperation
}

const operationSwitch = async (env) => {
  if (operation[env.operation]){
    return operation[env.operation](env)
  }
 throw new Error('GitHub Action does not operation: ' + env.operation)
}

module.exports = { operationSwitch  }