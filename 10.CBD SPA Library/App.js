/* eslint-disable no-continue */
import { TodoInput, TodoList, TodoFilter } from './component/index.js';

function updateAttributes(oldNode, newNode) {
  if (oldNode.tagName === 'INPUT') {
    console.log(oldNode.cloneNode(true), newNode.cloneNode(true));
    console.log(oldNode.getAttribute('checked'), newNode.getAttribute('checked'));

    oldNode.checked = newNode.checked;
  }

  for (const { name, value } of [...newNode.attributes]) {
    if (name === 'checked') continue;

    if (value !== oldNode.getAttribute(name)) {
      oldNode.setAttribute(name, value);
    }
  }
  for (const { name } of [...oldNode.attributes]) {
    if (name === 'checked') continue;

    if (newNode.getAttribute(name) === undefined) {
      oldNode.removeAttribute(name);
    }
  }
}

function updateElement(parent, oldChildren, newChildren) {
  // console.log('[parent]', parent);
  // console.log('[oldChildren]', oldChildren);
  // console.log('[newChildren]', newChildren);

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
  /*
    4   4    3 < 4 
    3 > 2    2   3
    2   1    1   2
    1            1
  */
  // console.log(new)
  // if (!newNode && oldNode) return oldNode.remove();
  // if (newNode && !oldNode) {
  //   console.log(parent, newNode);
  //   parent.appendChild(newNode);
  // }
  // if (newNode instanceof Text && oldNode instanceof Text) {
  //   if (oldNode.nodeValue === newNode.nodeValue) return;
  //   oldNode.nodeValue = newNode.nodeValue;
  //   return;
  // }
  // if (newNode.nodeName !== oldNode.nodeName) {
  //   const index = [...parent.childNodes].indexOf(oldNode);
  //   oldNode.remove();
  //   parent.appendChild(newNode, index);
  //   return;
  // }
  // updateAttributes(oldNode, newNode);
  // const newChildren = [...newNode.childNodes];
  // const oldChildren = [...oldNode.childNodes];
  // const maxLength = Math.max(newChildren.length, oldChildren.length);
  // for (let i = 0; i < maxLength; i++) {
  //   updateElement(oldNode, newChildren[i], oldChildren[i]);
  // }
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
    // if (oldState === undefined) {
    //   this.$root.innerHTML = `
    //       ${TodoInput()}
    //       ${TodoList(this.state)}
    //       ${TodoFilter(this.state)}
    //     `;

    //   return;
    // }

    // if (JSON.stringify(oldState) === JSON.stringify(this.state)) return;

    // const oldNode = document.createElement('div');
    // oldNode.innerHTML = `
    //   ${TodoInput()}
    //   ${TodoList(oldState)}
    //   ${TodoFilter(oldState)}
    // `;

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
