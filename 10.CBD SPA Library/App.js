/* eslint-disable no-continue */
import { TodoInput, TodoList, TodoFilter } from './component/index.js';

const updateTextContent = (oldNode, newNode) => {
  if ([...oldNode.children].length !== 0 || [...newNode.children].length !== 0) return;

  if (oldNode.textContent === newNode.textContent) return;

  oldNode.textContent = newNode.textContent;
};

const updateAttributes = (oldNode, newNode) => {
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
};

const updateProperties = (oldNode, newNode) => {
  if (oldNode.cloneNode(true).checked !== newNode.checked) oldNode.checked = newNode.checked;

  if (oldNode.cloneNode(true).value !== newNode.value) oldNode.value = newNode.value;

  if (oldNode.cloneNode(true).selected !== newNode.selected) oldNode.selected = newNode.selected;
};

const diff = (parent, oldChildren, newChildren) => {
  const maxLength = Math.max(oldChildren.length, newChildren.length);
  const cnt = newChildren.length - oldChildren.length;
  let oldIdx = 0;
  let newIdx = 0;

  while (oldIdx < maxLength || newIdx < maxLength) {
    const oldChild = oldChildren[oldIdx];
    const newChild = newChildren[newIdx];

    if (!oldChild && !newChild) break;

    // 기존노드 대비 추가할 노드가 있을때
    if (!oldChild && newChild) parent.appendChild(newChild);
    // 기존노드 대비 삭제할 노드 있을 때
    else if (oldChild && !newChild) parent.removeChild(oldChild);
    // 엘리먼트 타입이 다른 경우
    else if (oldChild.tagName !== newChild.tagName) parent.replaceChild(newChild, oldChild);
    // 엘리먼트 타입이 같은 경우
    else if (oldChild.tagName === newChild.tagName) {
      // 어트리뷰트 및 프로퍼티 비교

      if (oldChild.id && newChild.id && oldChild.id !== newChild.id) {
        if (cnt > 0) {
          oldChild.insertAdjacentHTML('beforebegin', newChild.outerHTML);
          newIdx += 1;
          continue;
        }
        if (cnt < 0) {
          parent.removeChild(oldChild);
          oldIdx += 1;
          continue;
        }
      }
      updateAttributes(oldChild, newChild);
      updateProperties(oldChild, newChild);
      updateTextContent(oldChild, newChild);

      diff(oldChild, [...oldChild.children], [...newChild.children]);
    }

    oldIdx += 1;
    newIdx += 1;
  }
};

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
    this.$todoInput = new TodoInput({ addTodo: this.addTodo.bind(this) });
    this.$todoList = new TodoList({ toggleTodo: this.toggleTodo.bind(this), removeTodo: this.removeTodo.bind(this) });
    this.$todoFilter = new TodoFilter({ filterTodo: this.filterTodo.bind(this) });

    this.render();
  }

  render() {
    const { todos, todoFilter, currentTodoFilterId } = this.state;

    const _todos = todos.filter(todo =>
      todoFilter[currentTodoFilterId] === 'Completed'
        ? todo.completed
        : todoFilter[currentTodoFilterId] === 'Active'
        ? !todo.completed
        : true
    );

    console.log('[STATE]', _todos);

    const newNode = this.$root.cloneNode(true);
    newNode.innerHTML = `
      ${this.$todoInput.render()}
      ${this.$todoList.render({ todos: _todos })}
      ${this.$todoFilter.render({ todoFilter, currentTodoFilterId })}
    `;

    const oldChildren = [...this.$root.children];
    const newChildren = [...newNode.children];

    diff(this.$root, oldChildren, newChildren);

    this.$todoInput.addEventHandler();
    this.$todoList.addEventHandler();
    this.$todoFilter.addEventHandler();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    this.render();
  }

  generateNextId() {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  }

  addTodo(content) {
    this.setState({ todos: [{ id: this.generateNextId.call(this), content, completed: false }, ...this.state.todos] });
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
