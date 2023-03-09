/* eslint-disable class-methods-use-this */
import Component from '../core/Component.js';
import Card from './Card.js';

class List extends Component {
  init() {
    requestAnimationFrame(() => this.bindEvents());
  }

  render() {
    const { task } = this.props;
    const { id, title, cards, isGeneratorActive, isTitleEdit } = task;

    // prettier-ignore
    return `
      <li id="${id}" class="list list-${id}" draggable="true">
        <div class="title">
          ${isTitleEdit ? `<input type="text" class="title__input" value=${title} />` : `<h2 class="title__text">${title}</h2>`}
        </div>
        <ul class="card-container">
          ${cards.map(card => new Card({card}).render()).join('')}
        </ul>
        ${!isGeneratorActive ? 
          `<button class="btn-add">+ Add a card</button>` :
          `
            <form class="form-card">
              <textarea autocomplete="off" class="input-card-title" name="input-card-title" placeholder="Enter a title for this card..."></textarea>
              <div class="btn-group">
                <button class="btn-add-card">Add Card</button>
                <button class="btn-close" type="button">
                  <i class='bx bx-x'></i>
                </button>
              </div>
            </form>
          `
        }
      </li>
		`;
  }

  bindEvents() {
    const { task, addCard, toggleCardGenerator, toggleTitleEdit, updateListTitle } = this.props;

    document.querySelector(`.list.list-${task.id} .title__input`)?.addEventListener('keydown', e => {
      if (e.keyCode !== 27 && e.keyCode !== 13) return;

      const { id } = e.target.closest('li');

      updateListTitle(id, e.target.value === '' ? task.title : e.target.value);
    });

    document.querySelector(`.list.list-${task.id} .title__text`)?.addEventListener('click', e => {
      const { id } = e.target.closest('li');

      toggleTitleEdit(id);
    });

    document.querySelector(`.list.list-${task.id} .input-card-title`)?.addEventListener('keydown', e => {
      if (e.keyCode !== 13) return;

      e.preventDefault();

      if (e.target.value === '') return;

      const { id } = e.target.closest('li');

      addCard(id, e.target.value);
    });

    document.querySelector(`.list.list-${task.id} .input-card-title`)?.addEventListener('keydown', e => {
      if (e.keyCode !== 27) return;

      e.preventDefault();

      toggleCardGenerator(e);
    });

    document.querySelector(`.list.list-${task.id} .form-card`)?.addEventListener('submit', e => {
      e.preventDefault();

      if (e.target['input-card-title'].value === '') return;

      const { id } = e.target.closest('li');

      addCard(id, e.target['input-card-title'].value);
    });

    document.querySelector(`.list.list-${task.id} .btn-add`)?.addEventListener('click', toggleCardGenerator);

    document.querySelector(`.list.list-${task.id} .btn-close`)?.addEventListener('click', toggleCardGenerator);
  }
}

export default List;
