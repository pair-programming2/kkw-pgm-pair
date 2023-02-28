class TodoFilter {
  constructor({ $root, state }) {
    this.$root = $root;
    this.state = state;

    this.render();
  }

  render() {
    const { todoFilter, currentTodoFilterId } = this.state;

    // prettier-ignore
    this.$root.innerHTML += `
      <ul class="todo-filters">
        ${todoFilter.map((filter, idx) => `
        <li id="${filter.toLowerCase()}" class="${currentTodoFilterId===idx ? 'active' : ''}">
          ${filter}
        </li>
        `).join('')}
      </ul>
    `
  }
}

export default TodoFilter;
