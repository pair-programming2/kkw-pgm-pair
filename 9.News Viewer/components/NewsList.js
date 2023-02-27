// const API_KEY = '5121afca32d04fc9ab31f616cc5cd29c';
// 0ac61bf1107c497288cfbd3669e18dfa
/**
 * KKW API
 * const API_KEY = '837a91453b3c41d29ad6d5e47e3e2bbc';
 * const API_KEY = 'f9ddeb555e384c058d101c5b84bdcaef';
 */
const BASE_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '0ac61bf1107c497288cfbd3669e18dfa';
const pageSize = 5;
let page = 1;

const fetchNews = async category => {
  try {
    // eslint-disable-next-line no-undef
    const response = await axios.get(
      // prettier-ignore
      `${BASE_URL}?country=kr&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );

    page += 1;

    return response.data.articles;
  } catch (error) {
    throw new Error(error);
  }
};

class Newslist {
  constructor({ $root, store }) {
    this.$root = $root;
    this.store = store;
    this.store.subscribe('category', this.render.bind(this));

    this.render();
  }

  async render() {
    const { state } = this.store;

    page = 1;
    const articles = await fetchNews(state.category);
    console.log('[render]', articles);

    // prettier-ignore
    this.$root.innerHTML += `
      <div class="news-list-container">
        <article class="news-list">
          ${articles.map(article=>`
            <section class="news-item">
              <div class="thumbnail">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                  <img
                    src="${article.urlToImage ?? 'https://via.placeholder.com/160'}"
                    alt="thumbnail" />
                </a>
              </div>
              <div class="contents">
                <h2>
                  <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                    ${article.title}
                  </a>
                </h2>
                <p>
                  ${article.content ?? '내용입니다'.repeat(30)}
                </p>
              </div>
            </section>
          `).join('')}
        </article>
        <div class="scroll-observer">
          <img src="img/ball-triangle.svg" alt="Loading..." />
        </div>
      </div>
    `;

    const $article = this.$root.querySelector('.news-list');
    const $observer = this.$root.querySelector('.scroll-observer');

    const callback = async entries => {
      if (!entries[0].isIntersecting) return;

      const articles = await fetchNews(state.category);
      console.log('[observer]', articles);

      if (articles.length === 0) {
        $observer.style.display = 'none';
        return;
      }

      const $fragment = document.createDocumentFragment();

      articles.forEach(article => {
        const $section = document.createElement('section');
        $section.classList.add('news-item');
        // prettier-ignore
        $section.innerHTML = `
          <div class="thumbnail">
            <a href="${article.url}" target="_blank" rel="noopener noreferrer">
              <img
                src="${article.urlToImage ?? 'https://via.placeholder.com/300'}"
                alt="thumbnail" />
            </a>
          </div>
          <div class="contents">
            <h2>
              <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                ${article.title}
              </a>
            </h2>
            <p>
              ${article.content ?? '내용입니다'.repeat(30)}
            </p>
          </div>
        `
        $fragment.appendChild($section);
      });

      $article.appendChild($fragment);
    };

    const io = new IntersectionObserver(callback, {
      threshold: 1,
    });

    io.observe($observer);
  }
}

export default Newslist;
