/* eslint-disable class-methods-use-this */
import Component from '../core/Component.js';

class Header extends Component {
  render() {
    return `
      <div class="header">
        <div class="header__title">
          <i class='bx bxl-trello'></i>
          <h1>2023 Trello</h1>
        </div>
      </div>
    `;
  }
}

export default Header;
