import diff from './diff.js';

class Component {
  constructor($container) {
    this.$container = $container;

    this.init(); // 초기화
    this.render(); // 랜더
  }

  // 초기화 - 상태 설정
  init() {}

  template() {
    return '';
  }

  render() {
    const { $container } = this;

    // 기존 Node를 복제한 후에 새로운 템플릿을 채워넣는다.
    const newNode = $container.cloneNode(true);
    newNode.innerHTML = this.template();

    const oldChildNodes = [...$container.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);

    for (let i = 0; i < max; i++) {
      diff($container, newChildNodes[i], oldChildNodes[i]);
    }

    requestAnimationFrame(() => this.setEvent());
  }

  setEvent() {}

  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}

export default Component;
