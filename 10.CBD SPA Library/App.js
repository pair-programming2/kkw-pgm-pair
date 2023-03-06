import { TodoInput, TodoList, TodoFilter } from './component/index.js';
import diff from './core/diff.js';

class App {
  constructor($root) {
    this.state = {
      todos: [
        { id: 3, content: 'Javascript', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 1, content: 'HTML', completed: false },
      ],
      todoFilter: ['All', 'Completed', 'Active'],
      currentTodoFilterId: 0,
    };

    this.$root = $root;
    this.$todoInput = new TodoInput({ addTodo: this.addTodo.bind(this) });
    this.$todoList = new TodoList({ toggleTodo: this.toggleTodo.bind(this), removeTodo: this.removeTodo.bind(this) });
    this.$todoFilter = new TodoFilter({ filterTodo: this.filterTodo.bind(this) });

    this.render();
  }

  render() {
    const { todos, todoFilter, currentTodoFilterId } = this.state;

    const _todos = todos.filter(todo =>
      todoFilter[currentTodoFilterId] === 'Completed'
        ? todo.completed
        : todoFilter[currentTodoFilterId] === 'Active'
        ? !todo.completed
        : true
    );

    console.log('[STATE]', _todos);

    const newNode = this.$root.cloneNode(true);

    newNode.innerHTML = `
      ${this.$todoInput.render()}
      ${this.$todoList.render({ todos: _todos })}
      ${this.$todoFilter.render({ todoFilter, currentTodoFilterId })}
    `;

    const oldChildren = [...this.$root.children];
    const newChildren = [...newNode.children];

    diff(this.$root, oldChildren, newChildren);

    this.$todoInput.addEventHandler();
    this.$todoList.addEventHandler();
    this.$todoFilter.addEventHandler();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };

    this.render();
  }

  generateNextId() {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  }

  addTodo(content) {
    this.setState({ todos: [{ id: this.generateNextId.call(this), content, completed: false }, ...this.state.todos] });
  }

  removeTodo(id) {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== +id) });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
    });
  }

  filterTodo(id) {
    this.setState({
      currentTodoFilterId: this.state.todoFilter.findIndex(filter => filter === id),
    });
  }
}

export default App;
