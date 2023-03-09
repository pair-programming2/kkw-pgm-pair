/* eslint-disable class-methods-use-this */
import Component from '../core/Component.js';

class Card extends Component {
  render() {
    const { card } = this.props;
    const { id, title } = card;

    return `
      <li id="${id}" class="card" draggable="true">${title}</li>
    `;
  }
}

export default Card;
