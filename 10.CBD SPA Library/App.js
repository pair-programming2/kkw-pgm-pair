import { TodoInput, TodoList, TodoFilter } from './component/index.js';
import diff from './core/diff.js';
import Component from './core/Component.js';

class App extends Component {
  init() {
    this.$root = document.getElementById('root');

    this.state = {
      todos: [
        { id: 3, content: 'Javascript', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 1, content: 'HTML', completed: false },
      ],
      todoFilter: ['All', 'Completed', 'Active'],
      currentTodoFilterId: 0,
    };

    this.$todoInput = new TodoInput({ addTodo: this.addTodo.bind(this) }).render;
    this.$todoList = new TodoList({
      toggleTodo: this.toggleTodo.bind(this),
      removeTodo: this.removeTodo.bind(this),
    }).render;
    this.$todoFilter = new TodoFilter({ filterTodo: this.filterTodo.bind(this) }).render;

    this.render();
  }

  render() {
    const { todos, todoFilter, currentTodoFilterId } = this.state;
    const { $todoInput, $todoList, $todoFilter } = this;

    const _todos = todos.filter(todo =>
      todoFilter[currentTodoFilterId] === 'Completed'
        ? todo.completed
        : todoFilter[currentTodoFilterId] === 'Active'
        ? !todo.completed
        : true
    );

    console.log('[STATE]', _todos);

    const newNode = this.$root.cloneNode(true);

    // prettier-ignore
    newNode.innerHTML = `
      ${$todoInput()}
      ${$todoList({ todos: _todos })}
      ${$todoFilter({ todoFilter, currentTodoFilterId })}
    `.replace(/\s*>[\s\n]*</g, '><').trim();

    if (!this.$root.innerHTML) {
      this.$root.innerHTML = newNode.innerHTML;
      return;
    }

    diff(this.$root, [...this.$root.childNodes], [...newNode.childNodes]);
  }

  generateNextId() {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  }

  addTodo(e) {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key !== 'Enter' || !e.target.matches('.todo-input')) return;

    const content = e.target.value.trim();
    if (content === '') return;

    e.target.value = '';
    this.setState({ todos: [{ id: this.generateNextId(), content, completed: false }, ...this.state.todos] });
  }

  removeTodo(e) {
    if (!e.target.matches('.todo-remove')) return;

    const { id } = e.target.closest('li');

    this.setState({ todos: this.state.todos.filter(todo => todo.id !== +id) });
  }

  toggleTodo(e) {
    if (!e.target.matches('input[type="checkbox"]')) return;

    const { id } = e.target.closest('li');

    this.setState({
      todos: this.state.todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo)),
    });
  }

  filterTodo(e) {
    if (!e.target.matches('.todo-filters > li')) return;

    const id = e.target.textContent.trim();

    this.setState({
      currentTodoFilterId: this.state.todoFilter.findIndex(filter => filter === id),
    });
  }
}

export default App;
