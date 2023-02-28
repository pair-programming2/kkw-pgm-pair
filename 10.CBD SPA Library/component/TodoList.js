import TodoItem from './TodoItem.js';

class TodoList {
  constructor({ $root, state }) {
    this.$root = $root;
    this.state = state;

    this.render();
  }

  render() {
    const { todos } = this.state;

    this.$root.innerHTML += `
      <ul class="todo-list">
        ${todos.map(todo => TodoItem(todo)).join('')}
      </ul>
    `;
  }
}

export default TodoList;
