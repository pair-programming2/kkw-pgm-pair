class TodoInput {
  constructor($root) {
    this.$root = $root;

    this.render();
  }

  //   prettier-ignore
  render() {
    this.$root.innerHTML = '<input type="text" class="todo-input" placeholder="Enter todo!" />';
  }
}

export default TodoInput;
