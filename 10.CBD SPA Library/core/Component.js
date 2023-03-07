/* eslint-disable class-methods-use-this */

class Component {
  constructor() {
    this.init();

    this.render = this.render.bind(this);
  }

  init() {}

  render() {
    throw new Error(`'render' 메서드를 구현해야 합니다.`);
  }

  bindEvents() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

export default Component;
