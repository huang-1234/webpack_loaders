module.exports = function (source) {
  const cssSource = source.match(/(?<=__CSS_SOURCE__)((.|\s)*?)(?=\*\/)/g); //获取 css 资源字符串
  const classKeyMap = source.match(/(?<=__CSS_classKeyMap__)((.|\s)*?)(?=\*\/)/g); // 获取 css 类名Map
  let script = `var style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(cssSource)};
  document.head.appendChild(style);
`;
  if (classKeyMap !== null) {
    script += `module.exports = ${classKeyMap}`;
  }
  return script;
};