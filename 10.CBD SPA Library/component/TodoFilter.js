/* eslint-disable class-methods-use-this */
class TodoFilter {
  constructor({ filterTodo }) {
    this.filterTodo = filterTodo;

    this.transmitFilterTodo = this.transmitFilterTodo.bind(this);
  }

  // prettier-ignore
  render({ todoFilter, currentTodoFilterId }) {
    return `
      <ul class="todo-filters">
        ${todoFilter.map((filter, idx) => `
        <li id="${filter.toLowerCase()}" class="${currentTodoFilterId===idx ? 'active' : ''}">
          ${filter}
        </li>
        `).join('')}
      </ul>
    `;
  }

  transmitFilterTodo(e) {
    if (!e.target.matches('.todo-filters > li')) return;

    this.filterTodo(e.target.textContent.trim());
  }

  addEventHandler() {
    document.querySelector('.todo-filters').removeEventListener('click', this.transmitFilterTodo);
    document.querySelector('.todo-filters').addEventListener('click', this.transmitFilterTodo);
  }
}

export default TodoFilter;
