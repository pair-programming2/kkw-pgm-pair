/* eslint-disable class-methods-use-this */
import Component from '../core/Component.js';
import Card from './Card.js';

class List extends Component {
  render() {
    const { id, title, cards } = this.props;
    return `
      <li id="${id}" class="list" draggable="true">
        <h2 class="title">${title}</h2>
        <ul class="card-container">
          ${cards.map(card => new Card(card).render()).join('')}
        </ul>
        <button class="btn-add">+ Add a card</button>
      </li>
		`;
  }
}

export default List;
