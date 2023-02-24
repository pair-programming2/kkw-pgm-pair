class TreeView {
  #$container = null;

  #tree = [];

  constructor($container, tree) {
    this.#$container = $container;
    this.#tree = tree;

    this.#addEventHandler();
    this.#render();
  }

  on(type, eventHandler) {
    if (!['select', 'expand', 'collapse'].includes(type)) throw new Error('잘못된 이벤트 타입입니다.');

    this.#$container.addEventListener(type, eventHandler);
  }

  #addEventHandler() {
    this.#$container.addEventListener('click', e => {
      const $a = e.target.closest('a');

      if (!$a) return;

      const { eventType, name, id } = $a.dataset;

      const customEvent = new CustomEvent(eventType, {
        detail: { name, id },
      });

      this.#$container.dispatchEvent(customEvent);
    });
  }

  #setState(newState) {
    this.#tree = newState;

    this.#render();
  }

  #createChildrenNode({ children, isOpen }) {
    if (children.length === 0) return '';

    // prettier-ignore
    return `
      <ul class="subtree-container ${isOpen ? '' : 'hide'}">
        ${this.#createDomString(children)}
      </ul>
    `
  }

  #createDomString(subTree) {
    // prettier-ignore
    return subTree.map(({id, name, children = [], isOpen = null}) => `
      <li class="tree-node">
        <a href="#" data-id="${id}" data-name="${name}" data-event-type="${!children.length ? 'select' : isOpen ? 'collapse' : 'expand'}">
          <span class="tree-switcher ${isOpen === null ? 'noop' : isOpen ? 'expand' : 'collapse'}"></span>
          <span class="tree-content">${name}</span>
        </a>
        ${this.#createChildrenNode({children, isOpen})}
      </li>
    `).join("");
  }

  #render() {
    // prettier-ignore
    this.#$container.innerHTML = `
      <ul class="tree-container">
        ${this.#createDomString(this.#tree)}
      </ul>
    `
  }

  #travelAndToggle(subTree, id) {
    return subTree.map(node => ({
      ...node,
      isOpen: node.id === +id ? !node.isOpen : node.isOpen,
      children: this.#travelAndToggle(node.children ?? [], id),
    }));
  }

  switch(id) {
    const updatedTree = this.#travelAndToggle(this.#tree, id);

    this.#setState(updatedTree);
  }
}

export default TreeView;
