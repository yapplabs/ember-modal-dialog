/* eslint-env node */
const { embroiderSafe, /* embroiderOptimized */ } = require('@embroider/test-setup');

module.exports = {
  useYarn: true,
  useVersionCompatibility: true,
  scenarios: [
    embroiderSafe(),
    // embroiderOptimized(),
  ]
};
