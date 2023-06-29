import style from './color.css'; //如果css-loader工作，style将是类名的keyMap
window.onload = () => {
  const body = document.body;
  const frameworks = ['react', 'vue', 'angular'];
  frameworks.forEach((item) => {
    const span = document.createElement('span');
    span.innerText = item;
    span.setAttribute('class', style[item]);
    body.appendChild(span);
  });
};