const {resolve} = require('path')

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [resolve('./step-definitions/acceptance/**/*.ts')],
    publishQuiet: true,
    worldParameters: {
      token: 'test-token',
      repo: 'release-query',
      owner: 'github-actions'
    },
    format: [
      'summary',
      'html:reports/cucumber.html',
      'message:reports/cucumber.json'
    ]
  }
}
