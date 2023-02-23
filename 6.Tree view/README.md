# Tree View

## 트리 travel 알고리즘

`tree` 배열(트리 구조로 되어 있음)을 travel할 때 dfs 알고리즘으로 구현했다.

### 자식 노드 렌더하기

트리를 재귀를 통해 순회하여 렌더하다가 `children.length === 0` 조건을 만족하면 재귀를 종료한다.

```js
#createChildrenNode({ children, isOpen }) {
  // base case
  if (children.length === 0) return '';

  return `
    <ul class="subtree-container ${isOpen ? '' : 'hide'}">
      ${this.#createDomString(children)}
    </ul>
  `
}
```

### `isOpen` 토글하기

트리를 재귀를 통해 순회하여 `node.name === targetName` 조건을 만족하는 노드의 `isOpen`을 토글한다.

```js
#travelAndToggle(subTree, targetName) {
  return subTree.map(node => ({
    ...node,
    isOpen: node.name === targetName ? !node.isOpen : node.isOpen,
    children: this.#travelAndToggle(node.children ?? [], targetName),
  }));
}
```

## CustomEvent 객체

자바스크립트에서 기본적으로 제공해주는 이벤트 타입 외의 사용자가 필요로 하는 이벤트 타입을 생성하기 위해 사용한다.

`CustomEvent`는 기본적으로 3가지의 로직이 필요하다.

1️⃣ `CustomEvent` 객체로 이벤트 객체를 생성한다.

```js
const customEvent = new CustomEvent(eventType, {
  detail: { name },
});
```

2️⃣ `addEventListener`로 커스텀 이벤트(`type`)의 이벤트 핸들러(`eventHandler`)를 등록한다.

```js
this.$container.addEventListener(type, eventHandler);
```

3️⃣ `dispatchEvent`의 인수로 발생시킬 이벤트 객체(`customEvent`) 전달하여 이벤트 핸들러를 동기 처리 방식으로 호출한다.

```js
this.$container.dispatchEvent(customEvent);
```

### detail

CustomEvent는 첫 번째 인수로 이벤트 타입을 전달 받고, 두 번째 인수로 **읽기 전용**인 `CustomEvent.detail` 프로퍼티를 전달 받는다.

## 리팩토링

### `#travelAndToggle` 함수 단순화

```js
#travelAndToggle(subTree, targetName) {
  return subTree.map(node =>
    node.name === targetName
      ? { ...node, isOpen: !node.isOpen, children: this.#travelAndToggle(node.children ?? [], targetName) }
      : { ...node, children: this.#travelAndToggle(node.children ?? [], targetName) }
  );
}
```

`node.name === targetName` 조건식의 위치를 변경하여 코드를 단순화 했다.

```js
#travelAndToggle(subTree, targetName) {
  return subTree.map(node => ({
    ...node,
    isOpen: node.name === targetName ? !node.isOpen : node.isOpen,
    children: this.#travelAndToggle(node.children ?? [], targetName),
  }));
}
```

## 선언

CustomEvent를 사용하기 위해 공부를 하고 실 적용을 시켜보는 과정을 진행하며 CustomEvent 사용법에 익숙해지는 계기가 되었다.

앞으로 CustomEvent가 필요한 시점에 이를 활용할 수 있도록 더 학습해야겠다.
