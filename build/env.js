
const path = require('path');
function resolveLocalPath(filePath) {
  return path.resolve(__dirname, filePath)
}
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  isProd,
  resolveLocalPath,
}