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
  constructor({ $root, store }) {
    this.$root = $root;
    this.store = store;

    this.render();
    this.addEventHandler();
  }

  addEventHandler() {
    this.$root.addEventListener('click', e => {
      if (!e.target.matches('.category-item')) return;

      const { state } = this.store;

      state.category = e.target.id;

      this.render();
    });
  }

  render() {
    const { state } = this.store;

    // prettier-ignore
    this.$root.innerHTML=`
      <nav class="category-list">
        <ul>
				${CATEGORYS.map(category=>`
					<li id="${category.id}" class="category-item ${category.id === state.category ? "active" : ""}">${category.title}</li>
				`).join("")}
        </ul>
      </nav>
    `
  }
}

export default Nav;
