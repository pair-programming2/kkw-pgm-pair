# Drag & Drop

## 피셔-예이츠 셔플 알고리즘

유한 순열의 무작위 순열을 생성하는 알고리즘으로 편향되지 않는 순열을 생성한다.

### 초기 알고리즘

1️⃣ 범위: 1 - 8, 난수: 3  
A B C D E F G H -> C

2️⃣ 범위: 1 - 7, 난수: 4  
A B D E F G H -> C E

3️⃣ 범위: 1 - 6, 난수: 5  
A B D F G H -> C E G

4️⃣ 범위: 1 - 5, 난수: 3  
A B D F H -> C E G D

5️⃣ 범위: 1 - 4, 난수: 4  
A B F H -> C E G D H

6️⃣ 범위: 1 - 3, 난수: 1  
A B F -> C E G D H A

7️⃣ 범위: 1 - 2, 난수: 2  
B F -> C E G D H A F

... 난수: 1  
B -> C E G D H A F B

- 결과를 저장할 별도의 공간이 필요
- 원본 배열에서 제거되는 부분 splice와 같은 처리 필요, `O(N * N)`

### 현대적인 방법

1️⃣ 범위: 1 - 8, 대상: 8, 난수: 6  
A B C D E H G -> F

2️⃣ 범위: 1 - 7, 대상: 7, 난수: 2  
A G C D E H -> B F

3️⃣ 범위: 1 - 6, 대상: 6 난수: 6  
A G C D E -> H B F

4️⃣ 범위: 1 - 5, 대상: 5 난수: 1  
E G C D -> A H B F

5️⃣ 범위: 1 - 4, 대상: 4 난수: 3  
E G D -> C A H B F

6️⃣ 범위: 1 - 3, 대상: 3 난수: 3  
E G -> D C A H B F

7️⃣ 범위: 1 - 2, 대상: 2 난수: 1  
G -> E D C A H B F

... 대상: 1, 난수: 1  
-> G E D C A H B F

- 원본 배열에서 swap 일어나서 별도의 공간 불필요
- splice와 같은 처리 불필요, `O(N)`

### 구현

HTML을 동적으로 생성시 `languages` 배열을 균일한 빈도수로 무작위 뒤섞기 위해 `피셔-예이츠 셔플`의 `현대적인 알고리즘`을 사용했다.

#### 의사코드

```
for i from n−1 downto 1 do
  j ← 0 ≤ j ≤ i인 임의의 정수
  a[j]와 a[i] 교환
```

#### 자바스크립트로 구현

```js
const fisherYatesShuffle = array => {
  const _array = [...array];
  let endOfRange = _array.length - 1;

  while (endOfRange) {
    const randomNumber = Math.floor(Math.random() * endOfRange);

    [_array[endOfRange], _array[randomNumber]] = [_array[randomNumber], _array[endOfRange]];

    endOfRange -= 1;
  }

  return _array;
};
```

## 드래그 앤 드롭 API

### `dragstart`

- 사용자가 요소 또는 텍스트 선택을 끌기 시작하면 이벤트가 시작된다.

### `dragover`

- 요소 또는 텍스트 선택 항목이 유효한 놓기 대상 위로 드래그될 때(수백 밀리초마다) 시작된다.

### `dragenter`

- 드래그한 요소 또는 텍스트 선택 항목이 유효한 드롭 대상에 들어가면 이벤트가 한번만 발생

### `dragleave`

- 드래그한 요소 또는 텍스트 선택이 유효한 놓기 대상을 벗어나면 이벤트가 시작된다.

### `drop`

- 요소 또는 텍스트 선택이 유효한 놓기 대상에 놓이면 이벤트가 시작된다.

### `dragstart` vs `drag`

`dragstart`는 사용자가 요소 또는 텍스트 선택 항목을 드래그 할 때 한 번 발생 되고 `drag`는 수백 밀리초마다 발생된다.

=> `dragstart` 사용

### `drop` vs `dragend`

`drop`은 유효한 드롭 대상에 요소 또는 텍스트 선택 항목을 놓을 때 발생하고 `dragend`는 드래그 작업이 종료될 때(마우스 버튼에서 손을 떼거나 ESC 키를 누르면) 드래그 이벤트가 발생한다.

=> `drop` 사용

### `dragover`와 `drop`의 관계

`dragover` 이벤트 핸들러에서 `e.preventDefault()`를 호출해서 `drop` 이벤트 핸들러가 동작할 수 있도록 했다. (`dragover`의 기본 동작은 `drop`을 허용하지 않는다.)

## 리팩토링

### 1️⃣`dragover` 대신 `dragenter` 사용

```js
$draggableList.addEventListener('dragover', e => {
  e.target.parentNode.classList.add('over');
});
```

`dragover`는 수백 밀리초 마다 발생한다.

```js
$draggableList.addEventListener('dragover', e => {
  e.preventDefault();
});

$draggableList.addEventListener('dragenter', e => {
  e.target.parentNode.classList.add('over');
});
```

`dragenter`는 한 번만 발생한다.

### 2️⃣`dataTransfer` 제거

```js
$draggableList.addEventListener('dragstart', e => {
  ...
  e.dataTransfer.setData('text/html', e.target.innerHTML);
  ...
})

$draggableList.addEventListener('drop', e => {
  ...
  $draggable.innerHTML = e.dataTransfer.getData('text/html');
  ...
})
```

리팩토링 전에는 `dragstart`와 `drop`에서 `dataTransfer.setData()`와 `dataTransfer.getData()`를 이용하여 드래그를 시작한 요소를 저장하고 참조하는 방식을 사용했다. 그러나 `dataTransfer` 객체는 파일 작업의 용도로 사용되므로 관련 로직을 제거하고 함수 내의 전역 변수인 `dragSrc`를 사용했다.

```js
let dragSrc = null;

$draggableList.addEventListener('dragstart', e => {
    dragSrc = e.target;
});

$draggableList.addEventListener('drop', e => {
  ...
  [dragSrc.innerHTML, $draggable.innerHTML] = [$draggable.innerHTML, dragSrc.innerHTML];
  ...
});
```
