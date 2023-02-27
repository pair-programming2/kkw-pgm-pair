import createStore from './core/Store.js';
import { Nav, NewsList } from './components/index.js';

const $root = document.getElementById('root');

const store = createStore({
  category: 'all',
});

// eslint-disable-next-line no-new
new Nav({ $root, store });
// eslint-disable-next-line no-new
new NewsList({ $root, store });
