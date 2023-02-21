const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

const fisherYatesShuffle = array => {
  let count = array.length - 1;

  while (count) {
    const index = Math.floor(Math.random() * count);

    const temp = array[count];
    array[count] = array[index];
    array[index] = temp;
    count -= 1;
  }
  return array;
};

const Swappable = $swappable => {
  let dragSrc = null;

  // prettier-ignore
  $swappable.innerHTML = `
		<ul class="draggable-list">
		${fisherYatesShuffle([...languages]).map((language, idx)=>`
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

    e.target.parentNode.classList.add('over');
  });

  $draggableList.addEventListener('dragleave', e => {
    e.preventDefault();

    e.target.parentNode.classList.remove('over');
  });

  $draggableList.addEventListener('drop', e => {
    // e.stopPropagation();
    e.preventDefault();

    if (!e.target.matches('.draggable')) return;

    if (dragSrc !== e.target) {
      dragSrc.innerHTML = e.target.innerHTML;
      e.target.innerHTML = e.dataTransfer.getData('text/html');
    }

    e.target.parentNode.classList.remove('over');

    checkRank(dragSrc.parentNode);
    checkRank(e.target.parentNode);
  });
};

export default Swappable;
