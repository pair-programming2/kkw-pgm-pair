import Component from './core/Component.js';
import Header from './component/Header.js';
import List from './component/List.js';
import ListGenerator from './component/ListGenerator.js';

class App extends Component {
  init() {
    this.$root = document.getElementById('root');

    const state = JSON.parse(localStorage.getItem('state')) ?? {};
    const tasks = state.tasks ?? [];

    this.state = {
      tasks: [...tasks],
      isGeneratorActive: !tasks.length,
    };

    this.toggleCardGenerator = this.toggleCardGenerator.bind(this);
    this.addCard = this.addCard.bind(this);
    this.toggleTitleEdit = this.toggleTitleEdit.bind(this);
    this.updateListTitle = this.updateListTitle.bind(this);

    this.render();
  }

  render() {
    requestAnimationFrame(() => this.bindEvents());

    console.log('state: ', this.state);
    const { tasks, isGeneratorActive } = this.state;
    const { toggleGenerator, toggleCardGenerator, addCard, toggleTitleEdit, updateListTitle } = this;

    this.$root.innerHTML = `
      ${new Header().render()}
      <ul class="list-container">
        ${tasks
          .map(task => new List({ task, toggleCardGenerator, addCard, toggleTitleEdit, updateListTitle }).render())
          .join('')}
        ${new ListGenerator({
          isGeneratorActive,
          toggleGenerator: toggleGenerator.bind(this),
          addList: this.addList.bind(this),
        }).render()}
      </ul>
    `;
  }

  generateNextListId() {
    return Math.max(0, ...this.state.tasks.map(task => task.id)) + 1;
  }

  generateNextCardId(id) {
    return Math.max(0, ...this.state.tasks[id - 1].cards.map(card => card.id)) + 1;
  }

  addList(title) {
    this.setState({
      tasks: [
        ...this.state.tasks,
        { id: this.generateNextListId(), title, cards: [], isGeneratorActive: false, isTitleEdit: false },
      ],
      isGeneratorActive: true,
    });
  }

  addCard(id, title) {
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.map(task =>
        task.id === +id ? { ...task, cards: [...task.cards, { id: this.generateNextCardId(id), title }] } : task
      ),
    });
  }

  toggleGenerator() {
    this.setState({ isGeneratorActive: !this.state.isGeneratorActive });
  }

  toggleCardGenerator(e) {
    const { id } = e.target.closest('li');
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.map(task => (task.id === +id ? { ...task, isGeneratorActive: !task.isGeneratorActive } : task)),
    });
  }

  toggleTitleEdit(id) {
    const { tasks } = this.state;

    this.setState({ tasks: tasks.map(task => (task.id === +id ? { ...task, isTitleEdit: !task.isTitleEdit } : task)) });
  }

  updateListTitle(id, title) {
    const { tasks } = this.state;

    this.setState({
      tasks: tasks.map(task => (task.id === +id ? { ...task, title, isTitleEdit: !task.isTitleEdit } : task)),
    });
  }

  bindEvents() {
    console.log(this);

    let dragSrc = null;
    let enter = null;
    let leave = null;

    const $container = document.querySelector('.list-container');

    // DragEvent
    $container.addEventListener('dragstart', e => {
      dragSrc = e.target;

      dragSrc.style.opacity = '0.3';
    });

    $container.addEventListener('dragover', e => {
      e.preventDefault();
    });

    $container.addEventListener('dragenter', e => {
      e.preventDefault();

      if (!e.target.matches('.list')) return;
      if (enter === e.target.closest('li')) return;

      enter = e.target.closest('li');

      const $li = e.target.closest('li');

      const isNextSibling = $li.nextElementSibling === dragSrc; // 뒤에 추가

      $container.replaceChild(dragSrc, $li);

      if (isNextSibling) $container.insertBefore($li, dragSrc.nextElementSibling);
      else $container.insertBefore($li, dragSrc);
    });

    $container.addEventListener('dragleave', e => {
      e.preventDefault();

      if (!e.target.matches('.list')) return;

      if (e.target.closest('.list') === enter) return;

      leave = e.target.closest('.list');
    });

    $container.addEventListener('drop', e => {
      e.preventDefault();

      console.log('[enter]', enter.id);
      console.log('[leave]', leave.id);
    });
  }
}

export default App;
