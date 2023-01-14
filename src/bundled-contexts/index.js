const contexts = {
  [`https://www.w3.org/2018/credentials/v1`]: require('./contexts/vc-v1.json'),
  [`https://ref.gs1.org/gs1/vc/licence-context/`]: require('./contexts/gs1-vc-v1.json'),
  [`https://w3id.org/vc/status-list/2021/v1`]: require('./contexts/vc-status-list-v1.json')
};

module.exports = contexts;