/* eslint-disable class-methods-use-this */
class TodoItem {
  render({ todo }) {
    const { id, content, completed } = todo;

    // prettier-ignore
    return `
      <li id="${id}">
        <input type="checkbox" ${completed ? 'checked' : ''}/>
        <span>${content}</span>
        <button class="todo-remove">X</button>
      </li>
    `;
  }
}

export default TodoItem;
