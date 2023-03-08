/* eslint-disable class-methods-use-this */

class Component {
  constructor(props) {
    this.props = props;

    this.init();
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
