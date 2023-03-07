import Component from '../core/Component.js';

class TodoFilter extends Component {
  constructor({ filterTodo }) {
    super();

    this.filterTodo = filterTodo;
  }

  render(props) {
    const { todoFilter, currentTodoFilterId } = props;

    requestAnimationFrame(() => this.bindEvents());

    // prettier-ignore
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

  bindEvents() {
    document.querySelector('.todo-filters').removeEventListener('click', this.filterTodo);
    document.querySelector('.todo-filters').addEventListener('click', this.filterTodo);
  }
}

export default TodoFilter;
