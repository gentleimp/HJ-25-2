'use strict';

function createElement(node) {
  const element = document.createElement(node.name);
  if (node.props !== null) {
    Object.keys(node.props).forEach(i => element.setAttribute(i, node.props[i]));    
  }
  if (typeof node.childs === 'string') {
    element.textContent = node.childs;
  } else if (node.childs instanceof Array) {
    node.childs.forEach((child) => {
      let elementChild = document.createElement(child.name);
      if (child.props !== null){
        Object.keys(child.props).forEach(i => elementChild.setAttribute(i, child.props[i]));
      }
      if (typeof child.childs === 'string') {
        elementChild.textContent = child.childs;
      } else if (child.childs instanceof Array) {
        child.childs.forEach((grandChild) => {
          if (typeof grandChild === 'string') {
            elementChild.textContent = grandChild;
          } else {
            let elementGrandChild = document.createElement(grandChild.name);
            if (grandChild.props !== null){
              Object.keys(grandChild.props).forEach(i => elementGrandChild.setAttribute(i, grandChild.props[i]));
            }
            if (typeof grandChild.childs === 'string') {
              elementGrandChild.textContent = grandChild.childs;
            } else if (!grandChild.childs[1]) {
              elementGrandChild.textContent = grandChild.childs[0];
            } else {
              elementGrandChild.textContent = grandChild.childs[0] + grandChild.childs[1];
            }
            elementChild.appendChild(elementGrandChild);
          }                    
        });
      }
      element.appendChild(elementChild);
    });        
  }
  return element;
}

 