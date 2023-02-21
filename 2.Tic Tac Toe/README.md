# Tic Tac Toe

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

  if (!board.filter(element => element === '').length) return `Draw`;

  return `Next Player: ${player}`;
};
```

## Learning point

### 상태(state)와 변수의 차이점은 무엇인가?

- 상태는 리렌더링에 영향을 주는 자바스크립트 데이터 또는 객체이다.
- 변수는 리렌더링에 영향을 주지 않는 자바스크립트 데이터 또는 객체이다.

### 모든 요소를 #root 요소에 동적 생성하는 방법을 사용할 때 장점과 단점은 무엇인가?

#### 장점

- 자바스크립트를 통해 HTML을 동적으로 생성하면 HTML에 대한 의존성이 감소한다. 의존성이 높으면 HTML이 변경이 자바스크립트에 많은 영향을 미친다.

#### 단점

- 자바스크립트를 통해 HTML을 동적으로 생성하면 리렌더링이 발생할 때 변경이 일어나지 않은 부분(즉, 리렌더링이 불필요한 부분)까지 같이 리렌더링이 발생한다. 이는 성능을 저하시킨다.
