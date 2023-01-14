const core = require("@actions/core");

const lib = require("./src");

const getOpts = () => {
  return {
    apiKey: core.getInput("api-key"),
    operation: core.getInput("operation"),
    document: core.getInput("document"),
  };
};

async function run() {
  try {
    const opts = getOpts();
    const response = await lib.adapter.operationSwitch(opts);
    core.setOutput("json", JSON.stringify(response));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
