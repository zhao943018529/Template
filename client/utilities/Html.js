function getClientPosition(elt){
    let x=0;
    let y=0;
    for(let e =elt;e!=null;e=e.offsetParent){
        y+=e.offsetTop;
        x+=e.offsetLeft;
    }

    for(let e =elt.parentNode;e!=null&&e.nodeType==1;e=e.parentNode){
        y-=e.scrollTop;
        x-=e.scrollLeft;
    }

    return {
        left:x,
        top:y,
    };
}

function getScroll(w, top) {
    let ret = w[`page${top ? 'Y' : 'X'}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
      const d = w.document;
      // ie6,7,8 standard mode
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        // quirks mode
        ret = d.body[method];
      }
    }
    return ret;
  }

  function getScrollLeft(w) {
    return getScroll(w);
  }

  function getScrollTop(w) {
    return getScroll(w, true);
  }

function getOffset(el){
    let pos = getClientPosition(el);
    let doc = el.ownerDocument;
    let w = doc.defaultView || doc.parentWindow;
    pos.left+=getScrollLeft(w);
    pos.top+=getScrollTop(w);

    return pos;
}

export {
    getClientPosition,
    getScrollLeft,
    getScrollTop,
    getOffset,
};