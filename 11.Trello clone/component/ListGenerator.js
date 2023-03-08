import Component from '../core/Component.js';

class ListGenerator extends Component {
  init() {
    requestAnimationFrame(() => this.bindEvents());
  }

  render() {
    const { isGeneratorActive } = this.props;

    // prettier-ignore
    return `
      <div class="list-generator">
        ${!isGeneratorActive ? 
          ` <button class="btn-add">+ Add another list</button>` : 
          `
            <form class="form-list">
              <input class="input-list-title" name="input-list-title" placeholder="Enter list title..." />
              <div class="btn-group">
                <button class="btn-add-list">Add List</button>
                <button class="btn-close" type="button">
                  <i class='bx bx-x'></i>
                </button>
              </div>
            </form>
				  `}
      </div>
    `;
  }

  bindEvents() {
    const { toggleGenerator, addList } = this.props;

    document.querySelector('.input-list-title')?.focus();

    document.querySelector('.input-list-title')?.addEventListener('keydown', e => {
      if (e.keyCode !== 27) return;
      toggleGenerator();
    });

    document.querySelector('.form-list')?.addEventListener('submit', e => {
      e.preventDefault();
      if (e.target['input-list-title'].value === '') return;

      addList(e.target['input-list-title'].value);
    });

    document.querySelector('.list-generator .btn-add')?.addEventListener('click', toggleGenerator);

    document.querySelector('.btn-close')?.addEventListener('click', toggleGenerator);
  }
}

export default ListGenerator;
