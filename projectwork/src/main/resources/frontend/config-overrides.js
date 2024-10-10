const path = require('path');

module.exports = function override(config) {
  if (config.mode === 'production') {
    // Customize output directory
    config.output.path = path.resolve(__dirname, '../static'); // Change 'dist' to your desired folder
  }
  return config;
};