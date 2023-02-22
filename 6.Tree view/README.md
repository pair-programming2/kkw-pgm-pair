# Tree View

## 트리 travel 알고리즘

`tree` 배열(트리 구조로 되어 있음)을 travel할 때 dfs 알고리즘으로 구현했다.

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

CustomEvent는 첫 번째 인수로 이벤트 타입을 나타내는 문자열을 전달 받고, 두 번째 인수로 bubbles, cancelable등의 이벤트 객체 프로퍼티 또는
CustomEvent.detail 프로퍼티를 전달 받을 수 있다.

detail은 읽기전용이다.

## 리팩토링

<!-- // findNode(targetName, tree) {
  //   const _tree = tree.map(node =>
  //     node.name === targetName
  //       ? { ...node, isOpen: !node.isOpen, children: this.findNode(targetName, node.children ?? []) }
  //       : { ...node, children: this.findNode(targetName, node.children ?? []) }
  //   );

  //   return _tree;
  // }

  // toggle(targetName, tree) {
  //   const _tree = this.findNode(targetName, tree);

  //   this.setState(_tree);
  // } -->

<!--
  travelAndToggle(subTree, targetName) {
    return subTree.map(node =>
      node.name === targetName
        ? { ...node, isOpen: !node.isOpen, children: this.travelAndToggle(node.children ?? [], targetName) }
        : { ...node, children: this.travelAndToggle(node.children ?? [], targetName) }
    );
  }

  switch(targetName) {
    const updatedTree = this.travelAndToggle(this.tree, targetName);

    this.setState(updatedTree);
  } -->
