/* eslint-disable no-continue */
import { TodoInput, TodoList, TodoFilter } from './component/index.js';

function updateAttributes(oldNode, newNode) {
  if (oldNode.cloneNode(true).checked !== newNode.checked) oldNode.checked = newNode.checked;

  for (const { name, value } of [...newNode.attributes]) {
    if (value !== oldNode.getAttribute(name)) {
      oldNode.setAttribute(name, value);
    }
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) === undefined || newNode.getAttribute(name) === null) {
      oldNode.removeAttribute(name);
    }
  }
}

function updateElement(parent, oldChildren, newChildren) {
  const maxLength = Math.max(oldChildren.length, newChildren.length);
  let oldIdx = 0;
  let newIdx = 0;

  while (oldIdx < maxLength && newIdx < maxLength) {
    const oldChild = oldChildren[oldIdx];
    const newChild = newChildren[newIdx];

    if (!oldChild && newChild) {
      parent.appendChild(newChild);
    } else if (oldChild && !newChild) {
      parent.removeChild(oldChild);
    } else if (oldChild.tagName === newChild.tagName) {
      updateAttributes(oldChild, newChild);

      if ([...oldChild.children].length === 0 && [...newChild.children].length === 0) {
        if (oldChild.textContent !== newChild.textContent) oldChild.textContent = newChild.textContent;
      }

      updateElement(oldChild, [...oldChild.children], [...newChild.children]);
    } else if (oldChild.tagName !== newChild.tagName) {
      parent.replaceChild(newChild, oldChild);
    }

    oldIdx += 1;
    newIdx += 1;
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

    this.$root.addEventListener('click', e => {
      if (!e.target.matches('.todo-remove')) return;

      this.removeTodo(e.target.closest('li').id);
    });

    this.$root.addEventListener('change', e => {
      if (!e.target.matches('input[type="checkbox"]')) return;

      this.toggleTodo(e.target.closest('li').id);
    });

    this.$root.addEventListener('click', e => {
      if (!e.target.matches('.todo-filters > li')) return;

      this.filterTodo(e.target.textContent.trim());
    });
  }

  render() {
    const { todos, todoFilter, currentTodoFilterId: id } = this.state;

    const _todos = todos.filter(todo =>
      todoFilter[id] === 'Completed' ? todo.completed : todoFilter[id] === 'Active' ? !todo.completed : true
    );

    console.log('[STATE]', _todos);

    const newNode = document.createElement('div');
    newNode.innerHTML = `
      ${TodoInput()}
      ${TodoList(_todos)}
      ${TodoFilter(this.state)}
    `;

    const oldChildren = [...this.$root.children];
    const newChildren = [...newNode.children];

    updateElement(this.$root, oldChildren, newChildren);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    this.render();
  }

  generateNextId() {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  }

  addTodo(content) {
    this.setState({ todos: [{ id: this.generateNextId(), content, completed: false }, ...this.state.todos] });
  }

  removeTodo(id) {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== +id) });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
    });
  }

  filterTodo(id) {
    this.setState({
      currentTodoFilterId: this.state.todoFilter.findIndex(filter => filter === id),
    });
  }
}

export default App;
