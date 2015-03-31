exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    browserName: 'firefox'
  },

  baseUrl: 'http://localhost:8000/app/',

  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
