/* eslint-disable class-methods-use-this */
import TodoItem from './TodoItem.js';

class TodoList {
  constructor({ toggleTodo, removeTodo }) {
    this.toggleTodo = toggleTodo;
    this.removeTodo = removeTodo;

    this.transmitToggleTodo = this.transmitToggleTodo.bind(this);
    this.transmitRemoveTodo = this.transmitRemoveTodo.bind(this);
  }

  // prettier-ignore
  render({todos}){
    return`
        <ul class="todo-list">
          ${todos.map(todo => new TodoItem().render({todo})).join('')}
        </ul>
      `;
  }

  transmitToggleTodo(e) {
    if (!e.target.matches('input[type="checkbox"]')) return;

    this.toggleTodo(e.target.closest('li').id);
  }

  transmitRemoveTodo(e) {
    if (!e.target.matches('.todo-remove')) return;

    this.removeTodo(e.target.closest('li').id);
  }

  addEventHandler() {
    document.querySelector('.todo-list').removeEventListener('change', this.transmitToggleTodo);
    document.querySelector('.todo-list').addEventListener('change', this.transmitToggleTodo);

    document.querySelector('.todo-list').removeEventListener('click', this.transmitRemoveTodo);
    document.querySelector('.todo-list').addEventListener('click', this.transmitRemoveTodo);
  }
}

export default TodoList;
