export function hello() {
  const component = () => {
    const element = document.createElement('div');
    element.innerHTML = 'Hello webpackaaaaaa'
    const test = 123;
    return element;
  }
  document.body.appendChild(component());
}