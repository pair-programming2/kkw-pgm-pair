/**
 * attriute vs property
 * (getattribute) vs (DomNode에서 직접봐라...)
 * property 구분(checked, value, selected)
 */

const updateAttributes = (oldNode, newNode) => {
  if (oldNode.cloneNode(true).checked !== newNode.checked) oldNode.checked = newNode.checked;

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

const diff = (parent, oldChildren, newChildren) => {
  const maxLength = Math.max(oldChildren.length, newChildren.length);
  let oldIdx = 0;
  let newIdx = 0;

  while (oldIdx < maxLength && newIdx < maxLength) {
    const oldChild = oldChildren[oldIdx];
    const newChild = newChildren[newIdx];

    if (!oldChild && newChild) {
      parent.appendChild(newChild);
    } else if (oldChild && !newChild) {
      parent.removeChild(oldChild);
    } else if (oldChild.tagName === newChild.tagName) {
      updateAttributes(oldChild, newChild);

      if ([...oldChild.children].length === 0 && [...newChild.children].length === 0) {
        if (oldChild.textContent !== newChild.textContent) oldChild.textContent = newChild.textContent;
      }

      diff(oldChild, [...oldChild.children], [...newChild.children]);
    } else if (oldChild.tagName !== newChild.tagName) {
      parent.replaceChild(newChild, oldChild);
    }

    oldIdx += 1;
    newIdx += 1;
  }
};

export default diff;
