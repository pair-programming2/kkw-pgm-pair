const $link = [...document.querySelectorAll('link')].at(-1);

$link.insertAdjacentHTML('afterend', '<link href="star-rating/theme.css" rel="stylesheet" />');

const StarRating = $container => {
  const { maxRating } = $container.dataset;

  $container.innerHTML = `
    <div class ="star-rating-container">
      ${`<i class='bx bxs-star'></i>`.repeat(maxRating)}
    </div>
  `;

  const $icons = [...$container.querySelectorAll('i.bxs-star')];

  const hover = $icon => {
    if (!$icon) return;

    $icon.classList.add('hovered');

    hover($icon.previousElementSibling);
  };

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

  const loopAndRemoveClass = className => {
    $icons.forEach($icon => {
      $icon.classList.remove(className);
    });
  };

  $container.addEventListener('mouseover', e => {
    if (!e.target.matches('i.bxs-star')) return;

    hover(e.target);
  });

  $container.addEventListener('mouseout', e => {
    if (e.target.matches('.star-rating')) return;

    loopAndRemoveClass('hovered');
  });

  $container.addEventListener('click', e => {
    if (!e.target.matches('i.bxs-star')) return;

    loopAndRemoveClass('selected');

    select(e.target, 0);
  });
};

export default StarRating;
