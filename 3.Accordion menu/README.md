# Accordion menu

## Learning point

### component

`웹 컴포넌트는 재사용 가능한 사용자 정의 요소(해당 기능을 나머지 코드와 분리하여 캡슐화)를 만들어 웹 앱에서 활용할 수 있는 다양한 기술 모음이다.`

( 출처: https://developer.mozilla.org/en-US/docs/Web/Web_Components )

즉, 컴포넌트란 프로그래밍에 있어 재사용이 가능한 각각의 독립된 모듈을 의미한다.

고전적인 웹 프로그래밍에서는 웹 페이지를 개발할 때 프로그램 전체에 대해 HTML, CSS, JS를 작성했다. 그러나 현대의 웹 프로그래밍에서는 컴포넌트 단위로 HTML, CSS, JS를 작성한다.

CBD(컴포넌트 기반 개발) 방법론에서는 블록을 조합하는 것처럼 컴포넌트를 조합하여 화면을 구성한다.

해당 과제에서는 Accordion Class가 Component이다.

### class vs. function component

- 공통점

클래스와 함수형 컴포넌트는 컴포넌트를 생성한다는 역할에서는 동일하다.

- 차이점

1. 선언방식의 차이가 있다. (`class` 키워드 필요 vs 화살표 함수)
2. 클래스형 컴포넌트에서는 this를 의식해야 한다.

### props

`props`를 컴포넌트를 생성할 때 인수처럼 전달되는 것이다.

`props`는 읽기 전용이다. 따라서 컴포넌트는 자신의 `props`를 다룰 때 순수 함수처럼 동작해야 한다.
