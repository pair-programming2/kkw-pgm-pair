# Tic Tac Toe

## 상태(state) vs 변수

- 상태가 변경되면 UI는 리렌더링 일어나야 한다. 그러나 변수의 변경은 UI의 리렌더링 영향을 주지 않는다.

- 따라서, 어떤 변수가 변경이 일어날 때 UI가 리렌더링되어야 하면 해당 변수는 상태로 관리한다.

## HTML 동적 생성의 장/단점

#### 장점

- 자바스크립트로 HTML 요소를 제어하기 용이하다.

- HTML 파일에 대한 의존성이 감소한다.

#### 단점

- 자바스크립트로 HTML을 직접 그리는 추가적인 작업이 필요하다.

- 리렌더링이 발생할 때 변경이 일어나지 않은 부분 즉, 리렌더링이 불필요한 부분까지 같이 리렌더링이 발생한다.

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
