import TodoItem from './TodoItem.js';
import Component from '../core/Component.js';

class TodoList extends Component {
  constructor({ toggleTodo, removeTodo }) {
    super();

    this.toggleTodo = toggleTodo;
    this.removeTodo = removeTodo;
  }

  render(props) {
    const { todos } = props;

    requestAnimationFrame(() => this.bindEvents());

    return `
      <ul class="todo-list">
        ${todos.map(todo => new TodoItem().render({ todo })).join('')}
      </ul>
    `;
  }

  bindEvents() {
    document.querySelector('.todo-list').removeEventListener('change', this.toggleTodo);
    document.querySelector('.todo-list').addEventListener('change', this.toggleTodo);

    document.querySelector('.todo-list').removeEventListener('click', this.removeTodo);
    document.querySelector('.todo-list').addEventListener('click', this.removeTodo);
  }
}

export default TodoList;
