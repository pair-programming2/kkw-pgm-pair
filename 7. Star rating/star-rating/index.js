const $link = [...document.querySelectorAll('link')].at(-1);

$link.insertAdjacentHTML('afterend', '<link href="star-rating/theme.css" rel="stylesheet" />');

// star 요소에 마우스 올리면 해당 요소 포함 이전 요소 색상 #a7a7a7 mouseover
// star-rating 요소에서 마우스가 벗어나면 모든 star 요소의 color를 변경(#dcdcdc)한다. mouseout
// 특정 star 요소를 클릭하면 해당 star 요소와 이전 star 요소 모두 color를 변경(#db5b33)한다.
// 특정 star 요소를 클릭하면 star 요소의 rating이 결정된다. rating이 결정되면 커스텀 이벤트 'rating-change'를 통해 외부로 방출한다. 이를 캐치해 화면에 표시한다.
const StarRating = $container => {
  const { maxRating } = $container.dataset;

  $container.innerHTML = `
    <div class ="star-rating-container">
      ${`<i class='bx bxs-star'></i>`.repeat(maxRating)}
    </div>
  `;

  // previousElementSibiling
  const $icons = [...$container.querySelectorAll('i.bxs-star')];

  const hover = $icon => {
    if (!$icon) return;

    $icon.classList.add('hovered');

    hover($icon.previousElementSibling);
  };

  const leave = () => {
    $icons.forEach($icon => {
      $icon.classList.remove('hovered');
    });
  };

  $container.addEventListener('mouseover', e => {
    if (!e.target.matches('i.bxs-star')) return;

    hover(e.target);
  });

  $container.addEventListener('mouseout', e => {
    if (e.target.matches('.star-rating')) return;

    leave();
  });
};

export default StarRating;
