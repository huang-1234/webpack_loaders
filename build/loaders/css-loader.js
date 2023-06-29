// schema-utils 保证我们参数的可靠性，如果不符合 schema 的类型预期，webpack 会抛出异常


// 为 css 类名加上 scope
const getOptions = require('loader-utils').getOptions;
const validateOptions = require('schema-utils').validate;
const schema = {
  type: 'object',
  properties: {
    module: {
      type: 'boolean'
    }
  }
};
// hash 生成函数
function hash() {
  const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return s4() + s4();
}

module.exports = function (source) {
  const options = getOptions(this);
  validateOptions(schema, options, 'css-loader'); //根据 schema 校验options参数类型是否正确
  const reg = /(?<=\.)(.*?)(?={)/g; //获取字符串所有类名的正则
  const classKeyMap = Object.fromEntries(source.match(reg).map((str) => [str.trim(), str.trim()])); //取出字符串中原始 css类名
  if (options.module) {
    //css-module
    const cssHashMap = new Map();
    source = source.replace(reg, (result) => {
      const key = result.trim();
      const cssHash = hash();
      cssHashMap.set(key, cssHash);
      return `${key}-${cssHash}`;
    });
    Object.entries(classKeyMap).forEach((item) => {
      classKeyMap[item[0]] = `${item[1]}-${cssHashMap.get(item[0])}`;
    });
  }
  return `/**__CSS_SOURCE__${source}*//**__CSS_classKeyMap__${JSON.stringify(classKeyMap)}*/`;
};