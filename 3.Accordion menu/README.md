# Accordion menu

## component

컴포넌트(Component)란 재사용이 가능한 독립된 모듈이다. 하나 이상의 컴포넌트들을 조합하여 화면을 구성할 수 있는데 이를 `CBD(컴포넌트 기반 개발)` 이라고 한다.

웹 컴포넌트는 `CBD`를 웹에서도 적용할 수 있도록 W3C에서 새로 정한 규격으로 웹 표준을 기반으로 구축되었으며, 최신 부라우저 및 모든 JavaScript 라이브러리, 프레임워크에서도 사용할 수 있다.

## class component vs function component

클래스형 컴포넌트와 함수형 컴포넌트는 동일하게 컴포넌트를 생성하는 역할을 한다.

### class componen (리액트 관점)

- state 및 라이프사이클 메서드를 사용할 수 있으며 임의 메서드를 정의할 수 있다.

- 반드시 render 함수가 존재해야 한다.

### function component (리액트 관점)

- 클래스형 컴포넌트보다 메모리 자원을 덜 사용한다.

- state와 라이프사이클 메서드를 사용할 수 없으며 Hook을 사용해야 한다.

## props

props는 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달해주는 객체이다. props는 읽기 전용으로 컴포넌트는 props를 다룰 때 순수 함수처럼 동작해야 한다.

## `showMultiple`

### 1️⃣ `showMultiple = false`일 때 초기 `menuList`의 `isOpen=true`인 노드가 2개 이상일 때

=> `id`가 가장 빠른 노드를 제외하고 모두 `isOpen: false`로 설정

```js
const { id } = menuList.find(menu => menu.isOpen);
...
this.menuList = showMultiple ? menuList : menuList.map(menu => (menu.id !== id ? { ...menu, isOpen: false } : menu));
```

### 2️⃣ `showMultiple = false`일 때 하나의 노드만 `isOpen: false`로 설정

```js
// 현재 클릭한 노드를 제외하고 모두 isOpen: false로 설정
...
menuList.map(menu => (menu.id === +id ? { ...menu, isOpen: !menu.isOpen } : { ...menu, isOpen: false }));
...
```
