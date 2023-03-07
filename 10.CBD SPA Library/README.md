# 10. CBD SPA Library

## 추상 컴포넌트 구현 (`./core/Component.js`)

- 리액트에서 클래스형 컴포넌트를 작성할 때 `React.Component`를 상속 받는다.

- `<App />`, `<TodoInput />`, `<TodoList />`, `<TodoFilter />`, `<TodoItem />` 을 구현할 때 상속해줄 추상 컴포넌트를 구현했다.

- 모든 클래스형 컴포넌트는 `render` 메서드를 필수로 구현해야한다.

```js
class Component {
  constructor() {
    this.init();

    this.render = this.render.bind(this);
  }

  init() {}

  render() {
    throw new Error(`'render' 메서드를 구현해야 합니다.`);
  }

  bindEvents() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
export default Component;
```

## 이벤트 핸들러 함수 전달 (App -> 하위 컴포넌트)

- 상태를 `<App />`에서 관리를 하고 있어서 `setState`도 `<App />`에 존재한다. 따라서 `addTodo` 등의 이벤트가 발생했을 때 호출되어 상태를 변경하는 메서드는 `<App />`에서 작성하고 하위 컴포넌트로 전달해줘야 한다.

- 하위 컴포넌트의 인스턴스를 생성할 때 `constructor`의 인수로 전달했다.

```js
this.$todoInput = new TodoInput({ addTodo: this.addTodo.bind(this) }).render;
this.$todoList = new TodoList({
  toggleTodo: this.toggleTodo.bind(this),
  removeTodo: this.removeTodo.bind(this),
}).render;
this.$todoFilter = new TodoFilter({ filterTodo: this.filterTodo.bind(this) }).render;
```

## 이벤트 핸들러 중복 등록 해결

### `requestAnimationFrame`

- 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 메서드이다.

- 모든 하위 컴포넌트의 render 메서드에서는 DomString 즉, 문자열을 반환하여 이벤트 핸들러 함수를 등록할 수 없다. 따라서 `#root`요소에 렌더할 모든 요소가 추가된 이후에 이벤트 핸들러 함수를 등록한다.

- `requestAnimationFrame` 메서드를 사용하여 리페인트 이전에 컴포넌트에 이벤트 핸들러 함수를 등록했다. 이때 중복 등록을 방지하기 위해 기존 이벤트 핸들러 함수를 삭제 후 등록하는 로직을 추가했다.

```js
// requestAnimationFrame 사용 전

// App.js
render() {
  ...// diff 이후
  this.$todoInput.addEventHandler();
  this.$todoList.addEventHandler();
  this.$todoFilter.addEventHandler();
}

// TodoInput.js
addEventHandler() {
  document.querySelector('.todo-input').removeEventListener('keydown', this.addTodo);

  document.querySelector('.todo-input').addEventListener('keydown', this.addTodo);
}
```

```js
// requestAnimationFrame 사용 후

// TodoInput.js
render(props) {
  ...
  requestAnimationFrame(() => this.bindEvents());
  ...
}

bindEvents() {
  document.querySelector('.todo-input').removeEventListener('keydown', this.addTodo);

  document.querySelector('.todo-input').addEventListener('keydown', this.addTodo);
}
```

## diff 알고리즘

### 초기 렌더링과 리렌더링 구분

- 초기 렌더링과 리렌더링을 구분하기 위해 `this.$root.innerHTML`이 빈 문자열인 경우 diff 알고리즘을 수행하지 않는다.

```js
// App.js
render() {
  ...
  //  초기 렌더링
  if (!this.$root.innerHTML) {
    this.$root.innerHTML = newNode.innerHTML;
    return;
  }

  diff(this.$root, [...this.$root.childNodes], [...newNode.childNodes]);
  ...
}
```

### 엘리먼트 타입이 같은 경우

- old 엘리먼트와 new 엘리먼트의 attributes, properties, text 등을 비교하여 동일한 내역은 유지하고 변경된 속성들만 갱신한다.

- 그 후 자식 노드로 재귀를 수행한다.

### 엘리먼트 타입이 다른 경우

- `replaceChild`메서드를 사용하여 old 엘리먼트에 new 엘리먼트로 교체한다.

### 같은 타입의 컴포넌트 엘리먼트

- 인스턴스는 동일하게 유지하고, 그 대신 props를 갱신한다.

### key props

- old parent의 length와 new parent의 length를 비교

```js
const diffOfLength = newChildren.length - oldChildren.length;
```

- `diffOfLength > 0`, new 엘리먼트에 존재하고 old 엘리먼트에 존재하지 않는 요소를 추가한다.

```js
if (diffOfLength > 0) {
  parent.insertBefore(newChild, oldChild); // oldChild 이전 형제 노드에 추가
  newIdx += 1;
  continue;
}
```

- `diffOfLength < 0`, new 엘리먼트에 존재하지 않고 old 엘리먼트에 존재하는 요소를 제거한다.

```js
if (diffOfLength < 0) {
  parent.removeChild(oldChild);
  oldIdx += 1;
  continue;
}
```

### DOM Attribute

- HTML 요소의 정적인 속성이며, HTML 속성 값을 변경하면 DOM Properties이 변경되지 않는다.
- 요소 노드의 초기 상태를 관리한다.
- `getAttribute`메서드로 취득한 값은 언제나 문자열이다.

### DOM Properties

- HTML 요소의 JavaScript 표현에서 사용되며, 동적으로 변경될 수 있다.
- 요소 노드의 최신 상태를 관리한다.
- `DOM 프로퍼티`로 취득한 값은 문자열이 아닐 수도 있다.(EX: `checkbox`요소의 `checked`는 `어트리뷰트 값`은 `문자열` 이지만 `프로퍼티 값`은 `불리언 타입`이다.)

## 선언

Reconciliation을 구현하면서 많은 것을 배운 과제였다. 항상 배움에 열려있는 마음으로 새로운 기술과 개념을 습득하며 성장해나가도록 하겠다.
