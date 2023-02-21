const languages = ['JavaScript', 'Java', 'Python', 'CSS', 'PHP', 'Ruby', 'C++', 'C', 'Shell', 'C#'];

// 피셔- 예이츠 알고리즘
// 배열의 마지막부터 처음까지 반복
// 현재 index의 값과, 무작위로 생성된 index의 값을 swap한다.
// 1 2 3 4 5 가 있으면 마지막 놈부터 랜덤으로 바까줌
const fisheryatesShuffle = array => {
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
  // prettier-ignore
  $swappable.innerHTML = `
		<ul class="draggable-list">
		${fisheryatesShuffle([...languages]).map((language,idx)=>`
			<li class="right">
				<div class="seq">${idx+1}</div>
				<div class="draggable" draggable="true">
					<p class="language-name">${language}</p>
					<i class="bx bx-menu"></i>
				</div>
			</li>
		`).join("")}
		</ul>
`

  const $draggableList = $swappable.querySelector('.draggable-list');

  const checkRank = (element, index) => {
    const isRight = element.querySelector('.language-name').textContent === languages[index];
    element.classList.toggle('right', isRight);
    element.classList.toggle('wrong', !isRight);
  };
  /**
   * 어떤 방법이 더 좋을까? 의논 해보자...
   */
  const checkRankAll = () => {
    [...$draggableList.children].forEach((dragItem, index) => checkRank(dragItem, index));
  };

  checkRankAll();

  let dragSrc = null;
  [...$draggableList.children].forEach(dragItem => {
    dragItem.addEventListener('dragstart', e => {
      dragSrc = e.target;
      e.dataTransfer.setData('text/html', e.target.innerHTML);
      e.dataTransfer.dropEffect = 'move';
    });

    dragItem.addEventListener('dragover', e => {
      e.preventDefault();
      e.target.parentNode.classList.add('over');
    });

    dragItem.addEventListener('dragleave', e => {
      e.target.parentNode.classList.remove('over');
    });

    dragItem.addEventListener('drop', e => {
      e.stopPropagation();
      const element = e.target.classList.contains('draggable')
        ? e.target
        : e.target.closest('li').querySelector('.draggable');

      if (dragSrc !== element) {
        dragSrc.innerHTML = element.innerHTML;
        element.innerHTML = e.dataTransfer.getData('text/html');
        checkRank(dragSrc.parentNode, +dragSrc.parentNode.querySelector('.seq').textContent - 1);
        checkRank(element.parentNode, +element.parentNode.querySelector('.seq').textContent - 1);
      }
      element.parentNode.classList.remove('over');
      return false;
    });
  });
};

export default Swappable;
