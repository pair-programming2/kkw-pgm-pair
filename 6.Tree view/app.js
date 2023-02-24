import TreeView from './tree-view/index.js';

/**
 * mock data
 */
const tree = [
  { id: 1, name: 'Home' },
  {
    id: 2,
    name: 'Drinks',
    isOpen: false,
    children: [
      {
        id: 21,
        name: 'Coffee',
        isOpen: false,
        children: [
          {
            id: 211,
            name: 'Americano',
            isOpen: false,
            children: [
              { id: 2111, name: 'Red Eye' },
              { id: 2112, name: 'Long Black' },
              { id: 2113, name: 'French' },
            ],
          },
          { id: 212, name: 'Cappuccino' },
          { id: 213, name: 'Espresso' },
        ],
      },
      {
        id: 22,
        name: 'Tee',
        isOpen: false,
        children: [
          { id: 221, name: 'Green Tea' },
          { id: 222, name: 'Black Tee' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Fruit',
    isOpen: false,
    children: [
      { id: 31, name: 'Apple' },
      {
        id: 32,
        name: 'Berry',
        isOpen: false,
        children: [
          { id: 321, name: 'Strawberry' },
          { id: 322, name: 'Blackberry' },
          { id: 323, name: 'Cranberry' },
        ],
      },
      { id: 33, name: 'Banana' },
    ],
  },
];

const treeView = new TreeView(document.getElementById('tree-navigation'), tree);

/**
 * select 이벤트: 펼치거나 닫을 수 없는 treeView node를 클릭하면 발생한다.
 */
treeView.on('select', e => {
  document.querySelector('main').textContent = e.detail.name;
});

/**
 * expand 이벤트: 현재 닫혀있는 treeView node를 클릭하면 발생한다.
 */
treeView.on('expand', e => {
  treeView.switch(e.detail.id);
});

/**
 * collapse 이벤트: 현재 열려있는 treeView node를 클릭하면 발생한다.
 */
treeView.on('collapse', e => {
  treeView.switch(e.detail.id);
});
