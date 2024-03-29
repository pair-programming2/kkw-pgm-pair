class Accordion {
  #$container = null;

  #menuList = [];

  #showMultiple = false;

  constructor({ $container, menuList, showMultiple = false }) {
    const { id } = menuList.find(menu => menu.isOpen);

    this.#$container = $container;
    this.#menuList = showMultiple
      ? menuList
      : menuList.map(menu => (menu.id !== id ? { ...menu, isOpen: false } : menu));
    this.#showMultiple = showMultiple;

    this.#addEventHandler();
    this.#render();
  }

  #setState(newState) {
    this.#menuList = newState;

    this.#render();
  }

  #addEventHandler() {
    this.#$container.addEventListener('click', e => {
      if (!e.target.matches('article > h1')) return;

      const { id } = e.target.closest('article').dataset;

      const _menuList = this.#showMultiple
        ? this.#menuList.map(menu => (menu.id === +id ? { ...menu, isOpen: !menu.isOpen } : menu))
        : this.#menuList.map(menu =>
            menu.id === +id ? { ...menu, isOpen: !menu.isOpen } : { ...menu, isOpen: false }
          );

      this.#setState(_menuList);
    });
  }

  #render() {
    // prettier-ignore
    this.#$container.innerHTML = this.#menuList.map(({id, title, subMenu, isOpen})=> `
      <div class='accordion-container'>
				<article data-id='${id}' class='${isOpen ? 'active' : ''}'>
					<h1><i class='bx bxs-chevron-down'></i>${title}</h1>
					<ul>
            ${subMenu.map(({title, path})=>`
						  <li><a href='${path}'>${title}</a></li>
						`).join("")}
					</ul>
				</article>
			</div>
    `).join("");
  }
}

export default Accordion;
