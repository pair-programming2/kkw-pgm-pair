# 9. News Viewer

## IntersectionObserver API

`IntersectionObserver API`는 타겟 요소와 상위 요소 또는 최상위 document의 viewport 사이의 intersection 내의 변화를 비동기적으로 관찰하는 방법이다.

즉, `IntersectionObserver`란 화면(viewport) 상에 내가 지정한 `target`이 보이고 있는지를 관찰하는 API다.

뷰포트에 `$observer`가 100% 보이면 다음 뉴스를 가져와 추가했다.

### 1️⃣ isIntersecting

`isIntersecting`은 `target`이 루트 요소와 교차 상태로 들어가거나 교차 상태에서 나가는지 여부를 나타내는 `IntersectionObserverEntry`의 인스턴스 속성이다.

이를 사용하여 `$observer`의 교차 상태가 false일(보이지 않는) 경우 실행하지 않게했다.

### 2️⃣ threshold

`threshold`는 `target`의 범위가 얼마나 교차 할 때 옵저버가 실행 될 지를 정하는 `IntersectionObserver`속성이다.

`threshold`속성 값을 `1`을 사용하여 100% 교차 할 때 옵저버가 실행 되도록 설정했다.

### 3️⃣ observe

`observe`는 관찰을 시작 하게 해주는 `IntersectionObserver`의 메서드다.

이를 사용하여 `$observer` 관찰을 시작했다.

```js
const callback = async entries => {
  if (!entries[0].isIntersecting) return;

  const articles = await fetchNews(state.category);

  if (articles.length === 0) {
    $observer.style.display = 'none';
    return;
  }

  const $fragment = document.createDocumentFragment();

  articles.forEach(article => {
    const $section = document.createElement('section');
    $section.classList.add('news-item');
    // prettier-ignore
    $section.innerHTML = `
          <div class="thumbnail">
            <a href="${article.url}" target="_blank" rel="noopener noreferrer">
              <img
                src="${article.urlToImage ?? 'https://via.placeholder.com/300'}"
                alt="thumbnail" />
            </a>
          </div>
          <div class="contents">
            <h2>
              <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                ${article.title}
              </a>
            </h2>
            <p>
              ${article.content ?? '내용입니다'.repeat(30)}
            </p>
          </div>
        `
    $fragment.appendChild($section);
  });

  $article.appendChild($fragment);
};

const io = new IntersectionObserver(callback, {
  threshold: 1,
});

io.observe($observer);
```

## Observer 패턴과 Proxy 객체

`Observer 패턴`은 옵저버들의 목록을 객체에 등록하여 상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버에게 통지하도록 하는 디자인 패턴이다. 전역 상태인 `category`와 구독 함수인 `subscribe`를 갖는 `Store`라는 Publish를 구현한다.

`Proxy` 객체는 인수로 전달받은 객체의 기본 작업을 가로채고 재정의하는 프록시를 만든다. 이를 통해 전역 상태를 참조하고(`get`) 변경하는(`set`) 작업을 가로채서 재정의하여 `Nav` 컴포넌트에서 `category`의 변경(`set`) 발생할 때 `subscribe`한 `NewsList` 컴포넌트의 `render`함수를 호출한다.

### Publish(발행 기관)

Observer는 전역 상태(`state`), 구독 함수(`subscribe`), 구독한 함수를 저장하는 객체(`events`)를 갖는다.

```js
const events = {};
// 전역 상태
const state = new Proxy(initialState, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;

    events[prop](); // subscribe한 함수 호출

    return true;
  },
});

// 구독 함수
const subscribe = (actionType, eventCallback) => {
  events[actionType] = eventCallback;
};
```

### mutate

- `Nav` 컴포넌트에서 카테고리를 클릭하면 전역 상태에 `mutate`가 발생한다.

```js
this.$root.addEventListener('click', e => {
  ...
  const { state } = this.store;
  state.category = e.target.id; // mutate
  ...
});
```

### subscriber(구독자)

전역 상태(`category`)가 변경될 때 `NewsList`의 render 함수가 실행될 수 있게 `subscribe` 함수의 인수로 전달한다.

```js
this.store.subscribe('category', this.render.bind(this));
```
