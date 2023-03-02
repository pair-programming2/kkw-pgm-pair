const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

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

const Swappable = $swappable => {
  let dragSrc = null;

  // prettier-ignore
  $swappable.innerHTML = `
		<ul class="draggable-list">
      ${fisherYatesShuffle(languages).map((language, idx)=>`
        <li class="${language === languages[idx] ? 'right' : 'wrong'}">
          <div class="seq">${idx+1}</div>
          <div class="draggable" draggable="true">
            <p class="language-name">${language}</p>
            <i class="bx bx-menu"></i>
          </div>
        </li>
      `).join("")}
		</ul>`

  const $draggableList = $swappable.querySelector('.draggable-list');

  const checkRank = $li => {
    const index = $li.querySelector('.seq').textContent - 1;
    const isRight = $li.querySelector('.language-name').textContent === languages[index];

    $li.classList.toggle('right', isRight);
    $li.classList.toggle('wrong', !isRight);
  };
  let isDragInLi = false;
  $draggableList.addEventListener('dragstart', e => {
    dragSrc = e.target;
  });

  $draggableList.addEventListener('dragover', e => {
    e.preventDefault();
  });

  $draggableList.addEventListener('dragenter', e => {
    // e.preventDefault();

    // 리팩토링 필요 add remove로 동작은 함
    isDragInLi = !e.target.closest('.seq') && e.target.closest('.over');

    console.log(isDragInLi);

    e.target.closest('li')?.classList.add('over');
  });

  $draggableList.addEventListener('dragleave', e => {
    // e.preventDefault();

    console.log('leave', isDragInLi);
    // 리팩토링 필요 add remove로 동작은 함
    if (isDragInLi || e.target.closest('.seq')) {
      console.log('ifLeave', isDragInLi);

      isDragInLi = null;
      console.log('ifLeave NULL', isDragInLi);

      return;
    }
    e.target.closest('li')?.classList.remove('over');
  });

  $draggableList.addEventListener('drop', e => {
    e.target.closest('li')?.classList.remove('over');

    const $draggable = e.target.closest('.draggable');

    if (!$draggable || dragSrc === e.target) return;

    [dragSrc.innerHTML, $draggable.innerHTML] = [$draggable.innerHTML, dragSrc.innerHTML];

    [dragSrc.parentNode, $draggable.parentNode].forEach(checkRank);
  });
};

export default Swappable;
