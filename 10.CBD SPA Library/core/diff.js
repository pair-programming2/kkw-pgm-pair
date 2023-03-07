/* eslint-disable no-continue */

const updateText = (oldNode, newNode) => {
  if (oldNode.nodeValue !== newNode.nodeValue) oldNode.nodeValue = newNode.nodeValue;
};

const updateAttributes = (oldNode, newNode) => {
  for (const { name, value } of [...newNode.attributes]) {
    if (value !== oldNode.getAttribute(name)) oldNode.setAttribute(name, value);
  }

  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) === undefined || newNode.getAttribute(name) === null) oldNode.removeAttribute(name);
  }
};

const updateProperties = (oldNode, newNode) => {
  for (const name of ['checked', 'value', 'selected']) {
    if (oldNode[name] !== newNode[name]) oldNode[name] = newNode[name];
  }
};

const diff = (parent, oldChildren, newChildren) => {
  const maxLength = Math.max(oldChildren.length, newChildren.length);
  const diffOfLength = newChildren.length - oldChildren.length;
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
    else if (oldChild instanceof Text && newChild instanceof Text) {
      updateText(oldChild, newChild);
    }
    // 엘리먼트 타입이 다른 경우
    else if (oldChild.tagName !== newChild.tagName) parent.replaceChild(newChild, oldChild);
    // 엘리먼트 타입이 같은 경우
    else if (oldChild.tagName === newChild.tagName) {
      if (oldChild.id && newChild.id && oldChild.id !== newChild.id) {
        if (diffOfLength > 0) {
          parent.insertBefore(newChild, oldChild);
          newIdx += 1;
          continue;
        }
        if (diffOfLength < 0) {
          parent.removeChild(oldChild);
          oldIdx += 1;
          continue;
        }
      }
      updateAttributes(oldChild, newChild);
      updateProperties(oldChild, newChild);

      diff(oldChild, [...oldChild.childNodes], [...newChild.childNodes]);
    }

    oldIdx += 1;
    newIdx += 1;
  }
};

export default diff;
