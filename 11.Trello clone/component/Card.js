/* eslint-disable class-methods-use-this */
import Component from '../core/Component.js';

class Card extends Component {
  render() {
    const { id, text } = this.props;

    return `
		  <li id="${id}" class="card" draggable="true">${text}</li>
		`;
  }
}

export default Card;
