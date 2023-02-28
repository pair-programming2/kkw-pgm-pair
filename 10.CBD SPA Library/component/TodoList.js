import TodoItem from './TodoItem.js';

const TodoList = ({ todos }) => {
  const render = () => `
    <ul class="todo-list">
      ${todos.map(todo => TodoItem(todo)).join('')}
    </ul>
  `;

  return render();
};

export default TodoList;
