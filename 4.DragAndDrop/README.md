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
- 원본 배열에서 제거되는 부분 splice와 같은 처리 필요, O(N \* N)

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
- splice와 같은 처리 불필요, O(N)

### 구현

HTML을 동적으로 생성시 `languages` 배열을 균일한 빈도수로 무작위 뒤섞기 위해 피셔-예이츠 셔플의 현대적인 알고리즘을 사용했다.

- 의사코드

```
for i from n−1 downto 1 do
     j ← 0 ≤ j ≤ i인 임의의 정수
     a[j]와 a[i] 교환
```

- 자바스크립트로 구현

```js
const fisherYatesShuffle = array => {
  let count = array.length - 1;

  while (count) {
    // count = 8, 0 <= index < 8
    const index = Math.floor(Math.random() * count);

    const temp = array[count];
    array[count] = array[index];
    array[index] = temp;
    count -= 1;
  }
  return array;
};
```

## 드래그 앤 드롭 API

HTML 요소를 드래그 앤 드롭을 하기 위해 드래그 앤 드롭 API 사용했다.
사용한 이벤트는 `dragstart`, `dragover`, `dragleave`, `drop`을 사용했다.

`dragstart`: 사용자가 요소 또는 텍스트 선택을 끌기 시작하면 이벤트가 시작된다.

`dragover`: 요소 또는 텍스트 선택 항목이 유효한 놓기 대상 위로 드래그될 때(수백 밀리초마다) 시작된다.

`dragleave`: 드래그한 요소 또는 텍스트 선택이 유효한 놓기 대상을 벗어나면 이벤트가 시작된다.

`drop`: 요소 또는 텍스트 선택이 유효한 놓기 대상에 놓이면 이벤트가 시작된다.

HTML요소를 드래그 동작으로 전송된 데이터를 보유하기 위해 `DataTransfer` 개체를 사용했다.

`DataTransfer`는 드래그 동작으로 전송된 데이터를 보유하고 `dragstart` 이벤트에서 설정되고 드롭 이벤트에서 판독처리된다.
e.dataTransfer.setData(mimeType, dataPayload)를 호출하면 개체의 MIME 유형과 데이터 페이로드를 설정할 수 있다.

HTML요소를 드롭시 타겟요소와 교체 하기 위해 `dataTransfer.getData`를 사용했다.

`dataTransfer.getData`는 지정된 유형에 대한 드래그 데이터(문자열)를 검색한다. 드래그 작업에 데이터가 포함되지 않은 경우 이 메서드는 빈 문자열을 반환한다.

HTML요소를 새 위치로 이동시키기 위해 `dataTransfer.dropEffect`를 사용했다.

`dataTransfer.dropEffect`는 사용자가 대상 요소 위로 마우스를 가져가면 브라우저의 커서가 어떤 유형의 작업(예: 복사, 이동 등)을 수행할 것인지 나타낸다.

none, copy, link, move 값 중 하나에 효과를 나타낼 수 있다.

`copy`: 원본 항목의 복사본이 새 위치에 만들어진다.

`move`: 항목이 새 위치로 이동된다.

`link`: 새 위치에서 소스에 대한 링크가 설정된다.

`none`: 요소를 드랍할 수 없다.

추가적인 이벤트 (터치 이벤트나 포인터 이벤트) 가 일어나지 않도록 하기 위해 각 핸들러에는 `e.preventDefault()`를 호출했다.

### dragstart vs drag

dragstart는 한 번 실행되어야 하고 drag는 계속 실행되어야 한다.
이러한 이유로 dragstart를 사용했다.

### drop vs dragend

drop놓기 대상에서 이벤트가 발생하고 dragend드래그 소스에서 이벤트가 발생한다.
이러한 이유로 drop을 사용했다.
