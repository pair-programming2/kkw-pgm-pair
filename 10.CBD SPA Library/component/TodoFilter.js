const TodoFilter = ({ todoFilter, currentTodoFilterId }) => {
  // prettier-ignore
  const render = () => `
    <ul class="todo-filters">
      ${todoFilter.map((filter, idx) => `
      <li id="${filter.toLowerCase()}" class="${currentTodoFilterId===idx ? 'active' : ''}">
        ${filter}
      </li>
      `).join('')}
    </ul>
  `

  return render();
};

export default TodoFilter;
