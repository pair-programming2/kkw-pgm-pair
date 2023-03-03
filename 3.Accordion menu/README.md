# Accordion menu

## component

- UI의 재사용 가능한 독립적인 모듈로 내부 상태와 프로퍼티를 가질 수 있고 다른 컴포넌트와 조합하여 애플리케이션을 개발하는데 사용된다.

- 컴포넌트 기반 개발(CBD)는 애플리케이션의 복잡도를 낮추고 재사용성을 높일 수 있으며 컴포넌트의 재사용을 통해 빠르고 효율적인 개발을 할 수 있다.

- 대표적인 자바스크립트 라이브러리로 React, Vue.js, Angular 등이 있다.

## class component vs function component

#### 역할

클래스형 컴포넌트와 함수형 컴포넌트는 동일하게 컴포넌트를 생성하는 역할을 한다.

#### 문법

클래스형 컴포넌트는 ES6 클래스 문법을 사용하여 정의되고 함수형 컴포넌트는 함수 선언문 또는 함수 표현식으로 정의된다.

#### 상태 관리

클래스형 컴포넌트에서는 this.state 객체를 사용하여 상태를 관리하고 함수형 컴포넌트에서는 useState 훅을 사용하여 상태를 관리한다.

#### 라이프사이클

클래스형 컴포넌트에서는 라이프사이클 메서드를 사용하여 컴포넌트의 생명주기 이벤트에 따라 동작을 구현하고 함수형 컴포넌트에서는 useEffect 훅을 사용하여 라이프사이클 이벤트에 따라 동작을 구현한다.

#### 성능

함수형 컴포넌트는 순수 함수로 구현되어 있으며 클래스형 컴포넌트보다 적은 양의 코드로 동일한 기능을 구현할 수 있다.

#### 테스트

함수형 컴포넌트는 순수 함수로 구현되어 있기 때문에 테스트가 쉽다. 그러나 클래스형 컴포넌트는 인스턴스를 생성하고 라이프사이클 메서드를 호출해야 하므로 테스트가 어렵다가가

## props

- 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달해주는 객체이다.

- 읽기 전용으로 컴포넌트는 props를 다룰 때 순수 함수처럼 동작해야 한다.

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
