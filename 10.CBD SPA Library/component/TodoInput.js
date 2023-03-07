import Component from '../core/Component.js';

class TodoInput extends Component {
  constructor({ addTodo }) {
    super();

    this.addTodo = addTodo;
  }

  render() {
    requestAnimationFrame(() => this.bindEvents());

    return `<input type="text" class="todo-input" placeholder="Enter todo!" />`;
  }

  bindEvents() {
    document.querySelector('.todo-input').removeEventListener('keydown', this.addTodo);

    document.querySelector('.todo-input').addEventListener('keydown', this.addTodo);
  }
}

export default TodoInput;
