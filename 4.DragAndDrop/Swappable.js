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

  $draggableList.addEventListener('dragstart', e => {
    dragSrc = e.target;

    e.dataTransfer.setData('text/html', e.target.innerHTML);
    e.dataTransfer.dropEffect = 'move';
  });

  $draggableList.addEventListener('dragover', e => {
    e.preventDefault();
  });

  $draggableList.addEventListener('dragenter', e => {
    e.target.parentNode.classList.add('over');
  });

  $draggableList.addEventListener('dragleave', e => {
    e.target.parentNode.classList.remove('over');
  });

  $draggableList.addEventListener('drop', e => {
    e.target.parentNode.classList.remove('over');

    if (!e.target.matches('.draggable') || dragSrc === e.target) return;

    dragSrc.innerHTML = e.target.innerHTML;
    e.target.innerHTML = e.dataTransfer.getData('text/html');

    [dragSrc.parentNode, e.target.parentNode].forEach(checkRank);
  });
};

export default Swappable;
