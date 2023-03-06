/* eslint-disable no-continue */

const updateTextContent = (oldNode, newNode) => {
  if ([...oldNode.children].length !== 0 || [...newNode.children].length !== 0) return;

  if (oldNode.textContent === newNode.textContent) return;

  oldNode.textContent = newNode.textContent;
};

const updateAttributes = (oldNode, newNode) => {
  for (const { name, value } of [...newNode.attributes]) {
    if (value !== oldNode.getAttribute(name)) {
      oldNode.setAttribute(name, value);
    }
  }

  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) === undefined || newNode.getAttribute(name) === null) {
      oldNode.removeAttribute(name);
    }
  }
};

const updateProperties = (oldNode, newNode) => {
  if (oldNode.cloneNode(true).checked !== newNode.checked) oldNode.checked = newNode.checked;

  if (oldNode.cloneNode(true).value !== newNode.value) oldNode.value = newNode.value;

  if (oldNode.cloneNode(true).selected !== newNode.selected) oldNode.selected = newNode.selected;
};

const diff = (parent, oldChildren, newChildren) => {
  const maxLength = Math.max(oldChildren.length, newChildren.length);
  const cnt = newChildren.length - oldChildren.length;
  let oldIdx = 0;
  let newIdx = 0;

  while (oldIdx < maxLength || newIdx < maxLength) {
    const oldChild = oldChildren[oldIdx];
    const newChild = newChildren[newIdx];

    if (!oldChild && !newChild) break;

    // 기존노드 대비 추가할 노드가 있을때
    if (!oldChild && newChild) parent.appendChild(newChild);
    // 기존노드 대비 삭제할 노드 있을 때
    else if (oldChild && !newChild) parent.removeChild(oldChild);
    // 엘리먼트 타입이 다른 경우
    else if (oldChild.tagName !== newChild.tagName) parent.replaceChild(newChild, oldChild);
    // 엘리먼트 타입이 같은 경우
    else if (oldChild.tagName === newChild.tagName) {
      if (oldChild.id && newChild.id && oldChild.id !== newChild.id) {
        if (cnt > 0) {
          oldChild.insertAdjacentHTML('beforebegin', newChild.outerHTML);
          newIdx += 1;
          continue;
        }
        if (cnt < 0) {
          parent.removeChild(oldChild);
          oldIdx += 1;
          continue;
        }
      }
      updateAttributes(oldChild, newChild);
      updateProperties(oldChild, newChild);
      updateTextContent(oldChild, newChild);

      diff(oldChild, [...oldChild.children], [...newChild.children]);
    }

    oldIdx += 1;
    newIdx += 1;
  }
};

export default diff;
