# Tic Tac Toe

## 상태(state) vs 변수

- 상태는 컴포넌트의 동적인 데이터를 나타내고, 변수는 임시 데이터나 계산 결과를 나타내는 데 사용된다.

#### 변경 가능성

- 상태는 변경 가능한 값이며, 변수는 변경 가능하거나 변경 불가능한 값일 수 있다.

- 상태는 값이 변경되면 컴포넌트 렌더링이 일어나고, 변수는 변경되어도 렌더링이 일어나지 않는다.

#### 범위

- 상태는 보통 컴포넌트 내부에서만 사용되지만, 변수는 전역 변수, 지역 변수, 매개 변수 등으로 사용된다.

#### 생명주기

- 상태는 컴포넌트의 생명주기에 따라 생성, 변경, 삭제되고 변수는 해당 범위가 종료될 때까지 유지된다.

## HTML 동적 생성의 장/단점

#### 장점

1. 동적인 웹 애플리케이션을 만들 수 있다.

2. 사용자 경험을 향상시킬 수 있다.

3. 코드의 유연성이 높아진다.

4. 개발 및 유지보수가 용이해진다.

#### 단점

1. 코드의 복잡도가 증가할 수 있다.

2. 검색 엔진 최적화(SEO)가 어려워질 수 있다.

3. 보안 이슈가 발생할 수 있다. (XSS 등)

## a === b === c 문제

```js
const isFinish = !!WINNER_CONDITIONS.filter(([a, b, c]) => (board[a] === board[b]) === board[c]).length;
```

3개의 값이 동일한지 비교하기 위해 `a === b === c` 형식의 연산식을 작성했고 항상 `false` 값만 반환되었다.

`b === c` => true or false

`a === (true or false)` => false (`a` 는 boolean이 아니다.)

즉, 자바스크립트의 Anti Pattern 이다.

```js
const isFinish = WINNER_CONDITIONS.some(
  ([a, b, c]) => board[a] !== '' && board[a] === board[b] && board[b] === board[c]
);
```

이를 해결 하기 위해 상기 코드로 변경을 했다.

## 리팩토링

### 1️⃣ GameStatus문구를 생성하는 함수

게임 종료 여부, board 상태 등에 따라 GameStatus 문구를 출력해야하는 코드에서 복잡성을 감소시키고 가독성 향상시키기 위해 이를 함수화했다.

```js
const createGameStatusText = () => {
  const { board, player, isFinish } = state;

  if (isFinish) return `Winner is ${player === 'X' ? 'O' : 'X'}`;

  if (board.every(element => element !== '').length) return `Draw`;

  return `Next Player: ${player}`;
};
```
