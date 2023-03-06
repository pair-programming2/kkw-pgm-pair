/* eslint-disable class-methods-use-this */

class TodoInput {
  constructor({ addTodo }) {
    this.addTodo = addTodo;
    this.transmitAddTodo = this.transmitAddTodo.bind(this);
  }

  render() {
    return `<input type="text" class="todo-input" placeholder="Enter todo!" />`;
  }

  transmitAddTodo(e) {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' || !e.target.matches('.todo-input')) return;

    const content = e.target.value.trim();
    if (content === '') return;

    e.target.value = '';

    this.addTodo(content);
  }

  addEventHandler() {
    document.querySelector('.todo-input').removeEventListener('keydown', this.transmitAddTodo);

    document.querySelector('.todo-input').addEventListener('keydown', this.transmitAddTodo);
  }
}

export default TodoInput;
