# Toggle Side Navigation

## beforeunload

`beforeunload` 이벤트는 사용자가 웹페이지를 떠날 때(새로고침, 앞/뒤로 가기, 브라우저 닫기, form submit 등)발생한다.

`$toggleBtn`이 클릭될 때마다 `isNavActive`를 `localStorage`에 저장하는 것보다 `beforeunload` 이벤트 발생 시 `localStorage`에 `isNavActive`를 저장하는 것이 적절하다.

MDN 조사 결과 특히 모바일에서는 load 전 이벤트가 안정적으로 실행되지 않는다고 한다.

EX)

1. 모바일 사용자가 귀하의 페이지를 방문합니다.
2. 그런 다음 사용자는 다른 앱으로 전환합니다.
3. 나중에 사용자는 앱 관리자에서 브라우저를 닫습니다.

하지만 현 과제는 모바일용이 아니기에 적용하였다.

```js
window.addEventListener('beforeunload', () => {
  localStorage.setItem('isNavActive', JSON.stringify(isNavActive));
});
```

## 리팩토링

### 1️⃣ `setTimeout` 안쓰고 .preload 제거하기

`setTimeout` 타이머 함수를 사용해 약 0.5초 delay 이후 `.preload`를 제거해줬다.

```js
window.addEventListener('DOMContentLoaded', () => {
  ...
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 500);
});
```

`$toggleBtn`을 클릭했을 때 `.preload`를 제거하는 방식으로 재구현했다. ( `classList.remove()` 메서드는 제거하려는 클래스가 존재하지 않아도 오류가 발생하지 않으며 아무 일도 일어나지 않는다.)

```js
$toggleBtn.addEventListener('click', () => {
  ...
  document.body.classList.remove('preload');
  ...
});

```

## Learning point

### 상태(state)란 무엇인가?

- 애플리케이션의 render에 영향을 미치는 자바스크립트 데이터 또는 객체, 즉 UI에 영향을 끼치며 사용자와의 상호작용을 통해 동적으로 계속해서 변화하는 것을 의미한다.
- 따라서 상태가 변경되면 리랜더링된다.

### 사용성을 위해 preload 클래스를 사용하고 있다. 이로 인해 CSS를 파악하기 어려워지고, JS도 추가적인 일을 해야 한다. 사용성에 문제가 발생하는 근본적인 원인은 무엇인가? 이 원인을 제거해 문제를 해결하기 위해서는 어떻게 해야 하는가?

- HTML이 정적으로 작성되어 있기 때문에 이러한 문제가 발생한다. 따라서 해당 문제를 해결하기 위해서는 자바스크립트를 통해 HTML을 동적으로 생성한다.
