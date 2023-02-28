const TodoItem = todo => {
  const render = () => {
    const { id, content, completed } = todo;

    return `
      <li id="${id}">
        <input type="checkbox" ${completed ? 'checked' : ''}/>
        <span>${content}</span>
        <button class="todo-remove">X</button>
      </li>
    `;
  };

  return render();
};

export default TodoItem;
