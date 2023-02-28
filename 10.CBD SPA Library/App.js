import { TodoInput, TodoList, TodoFilter } from './component/index.js';

function updateAttributes(oldNode, newNode) {
  for (const { name, value } of [...newNode.attributes]) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) !== undefined) continue;
    oldNode.removeAttribute(name);
  }
}

function updateElement(parent, newNode, oldNode) {
  if (!newNode && oldNode) return oldNode.remove();

  if (newNode && !oldNode) return parent.appendChild(newNode);

  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }

  updateAttributes(oldNode, newNode);

  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}

class App {
  constructor($root) {
    this.state = {
      todos: [
        { id: 3, content: 'Javascript', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 1, content: 'HTML', completed: false },
      ],
      todoFilter: ['All', 'Completed', 'Active'],
      currentTodoFilterId: 0,
    };

    this.$root = $root;

    this.render();

    this.$root.addEventListener('keydown', e => {
      if (e.isComposing || e.keyCode === 229) return;
      if (e.key !== 'Enter' || !e.target.matches('.todo-input')) return;

      const content = e.target.value.trim();
      if (content === '') return;

      e.target.value = '';

      this.addTodo(content);
    });
  }

  render(oldState) {
    if (oldState === undefined) {
      this.$root.innerHTML = `
          ${TodoInput()}
          ${TodoList(this.state)}
          ${TodoFilter(this.state)}
        `;

      return;
    }

    if (JSON.stringify(oldState) === JSON.stringify(this.state)) return;

    const oldNode = document.createElement('div');
    oldNode.innerHTML = `
      ${TodoInput()}
      ${TodoList(oldState)}
      ${TodoFilter(oldState)}
    `;

    const newNode = document.createElement('div');
    newNode.innerHTML = `
      ${TodoInput()}
      ${TodoList(this.state)}
      ${TodoFilter(this.state)}
    `;

    console.log(oldNode);
    console.log(newNode);

    updateElement(this.$root, newNode, oldNode);
  }

  setState(newState) {
    const oldState = this.state;
    this.state = { ...this.state, ...newState };

    this.render(oldState);
  }

  generateNextId() {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  }

  addTodo(content) {
    this.setState({ todos: [{ id: this.generateNextId(), content, completed: false }, ...this.state.todos] });
  }
}

export default App;
