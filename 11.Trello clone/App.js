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

    this.render();
  }

  render() {
    const { tasks, isGeneratorActive } = this.state;
    const { toggleGenerator } = this;

    this.$root.innerHTML = `
      ${new Header().render()}
      <ul class="list-container">
        ${tasks.map(task => new List(task).render()).join('')}
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

  addList(title) {
    this.setState({
      tasks: [...this.state.tasks, { id: this.generateNextListId(), title, cards: [] }],
      isGeneratorActive: true,
    });
  }

  toggleGenerator() {
    console.log('zz');
    this.setState({ isGeneratorActive: !this.state.isGeneratorActive });
  }
}

export default App;
