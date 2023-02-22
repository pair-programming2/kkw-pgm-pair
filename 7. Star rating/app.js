import StarRating from './star-rating/index.js';

const $containers = [...document.querySelectorAll('.star-rating')];

$containers.forEach($container => {
  // star-rating 컨테이너 요소의 참조를 StarRating 함수에 전달해 star 요소들로 구성된 star-rating 요소를 동적 생성한다.
  StarRating($container);
});
