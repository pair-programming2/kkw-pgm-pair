# Star Rating

## css 파일 동적으로 추가 하기

1️⃣ 마지막 `<link>` 가져오기

마지막 `<link>` 태그를 가져오기 위해 `querySelectorAll`메서드로 `<link>`요소들을 받아와서 배열로 변경한 후 `at`메서드를 사용하여 마지막 `<link>`요소만을 가져왔다.

```js
const $link = [...document.querySelectorAll('link')].at(-1);
```

2️⃣ 마지막 `<link>` 뒤에 `theme.css` 추가하기

`insertAdjacentHTML`은 HTML 같은 특정 텍스트를 파싱하고, DOM tree 안의 특정 위치에 원하는 node를 추가 한다. 이를 통해 첫번째 인수로 `afterend`를 전달하여 마지막 `<link>`의 다음 형제 요소로 추가했다.

```js
$link.insertAdjacentHTML('afterend', '<link href="star-rating/theme.css" rel="stylesheet" />');
```

## 마우스 이벤트

### mouseover, `hovered` 클래스 추가

마우스를 요소 위로 움직였을 때 발생하고 버블링이 일어난다.

마우스가 요소 위에 올라오면 `hover`함수에 인수로 이벤트가 발생한 객체를 넘겨주고 hover 함수에서는 `$icon`부터 이전 형제 `$icon`이 더 이상 존재하지 않을 때까지 `재귀 탐색`하여 `hovered` 클래스를 추가한다.

```js
const hover = $icon => {
  if (!$icon) return;

  $icon.classList.add('hovered');

  hover($icon.previousElementSibling);
};

$container.addEventListener('mouseover', e => {
  if (!e.target.matches('i.bxs-star')) return;

  hover(e.target);
});
```

### mouseout, `hovered` 클래스 제거

마우스 커서를 HTML 요소 밖으로 이동했을 때 발생하고 버블링이 일어난다.

`mouseout` 이벤트가 발생하면 `$icons`을 순차 탐색하며 `hovered` 클래스를 제거한다.

```js
const $icons = [...$container.querySelectorAll('i.bxs-star')];

const loopAndRemoveClass = className => {
  $icons.forEach($icon => {
    $icon.classList.remove(className);
  });
};

$container.addEventListener('mouseout', e => {
  if (e.target.matches('.star-rating')) return;

  loopAndRemoveClass('hovered');
});
```

### click, `selected` 클래스 추가 및 `rating-change` 이벤트 발생

마우스 버튼을 클릭했을 때 발생한다.

`click` 이벤트가 발생하면 `$icons`을 순차 탐색하며 기존의 `selected` 클래스를 제거하고 현재 `$icon`부터 이전 형제 `$icon`이 더 이상 존재하지 않을 때까지 재귀 탐색하며 `selected` 클래스를 추가한다.

추가적으로, `rating-change` 타입의 이벤트 객체를 생성한 후 이를 디스패치한다.

```js
const select = ($icon, rating) => {
  if (!$icon) {
    const customEvent = new CustomEvent('rating-change', {
      detail: rating,
    });

    return $container.dispatchEvent(customEvent);
  }

  $icon.classList.add('selected');

  select($icon.previousElementSibling, rating + 1);
};

$container.addEventListener('click', e => {
  if (!e.target.matches('i.bxs-star')) return;

  loopAndRemoveClass('selected');

  select(e.target, 0);
});
```

## 리팩토링

### 중복 제거를 위한 함수화

```js
 $icons.forEach($icon => {
  $icon.classList.remove("hovered");
});

    ...

$icons.forEach($icon => {
  $icon.classList.remove("selected");
});

```

`mouseout`과 `click` 이벤트 발생 시 클래스를 제거하는 코드의 패턴이 비슷하여 중복을 제거하기 위해 `loopAndRemoveClass`함수를 구현했다.

```js
const loopAndRemoveClass = className => {
  $icons.forEach($icon => {
    $icon.classList.remove(className);
  });
};
```
