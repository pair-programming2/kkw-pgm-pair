import { TodoInput, TodoList, TodoFilter } from './component/index.js';

let state = {
  todos: [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false },
  ],
  todoFilter: ['All', 'Completed', 'Active'],
  currentTodoFilterId: 0,
};

const addTodo = newTodo => {};

class App {
  constructor($root) {
    this.$todoInput = new TodoInput($root);
    this.$todoList = new TodoList({ $root, state });
    this.$todoFilter = new TodoFilter({ $root, state });
  }

  render() {
    this.$todoInput.render(state);
    this.$todoList.render(state);
    this.$todoFilter.render(state);
  }

  setState(newState) {
    state = { ...state, ...newState };
    this.render();
  }
}

export default App;
