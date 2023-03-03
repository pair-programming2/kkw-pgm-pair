const CATEGORYS = [
  {
    id: 'all',
    title: '전체보기',
  },
  {
    id: 'business',
    title: '비즈니스',
  },
  {
    id: 'entertainment',
    title: '엔터테인먼트',
  },
  {
    id: 'health',
    title: '건강',
  },
  {
    id: 'science',
    title: '과학',
  },
  {
    id: 'sports',
    title: '스포츠',
  },
  {
    id: 'technology',
    title: '기술',
  },
];

class Nav {
  #$root = null;

  #store = null;

  constructor({ $root, store }) {
    this.#$root = $root;
    this.#store = store;

    this.#render(store.state.category);
    this.#addEventHandler();
  }

  #addEventHandler() {
    this.#$root.addEventListener('click', e => {
      if (!e.target.matches('.category-item')) return;

      const { state } = this.#store;

      this.#render(e.target.id);

      state.category = e.target.id;
    });
  }

  #render(currentCategory) {
    // prettier-ignore
    this.#$root.innerHTML=`
      <nav class="category-list">
        <ul>
				${CATEGORYS.map(category=>`
					<li id="${category.id}" class="category-item ${category.id === currentCategory ? "active" : ""}">${category.title}</li>
				`).join("")}
        </ul>
      </nav>
    `
  }
}

export default Nav;
