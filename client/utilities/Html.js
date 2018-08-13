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

function getFocusedFromBlur(e){
    return  e.relatedTarget ||
            e.explicitOriginalTarget ||
            document.activeElement;
}

function serializeArray(form) {
    var field, l, s = [];
    if (typeof form == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;
        for (var i=0; i<len; i++) {
            field = form.elements[i];
            if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                if (field.type == 'select-multiple') {
                    l = form.elements[i].options.length; 
                    for (j=0; j<l; j++) {
                        if(field.options[j].selected)
                            s[s.length] = { name: field.name, value: field.options[j].value };
                    }
                } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[s.length] = { name: field.name, value: field.value };
                }
            }
        }
    }
    return s;
}

function serializeObject (a){
   var o = {};
   a.forEach(function(obj) {
       if (o[obj.name]) {
           if (!o[obj.name].push) {
               o[obj.name] = [o[obj.name]];
           }
           o[obj.name].push(obj.value || '');
       } else {
           o[obj.name] = obj.value || '';
       }
   });
   return o;
}

const KeyCode={
    Esc:27,
    Shift:17,
    Left:37,
    Right:39,
    Up:38,
    Down:40,
    Alt:18,
    Enter:13,
};

export {
    getClientPosition,
    getScrollLeft,
    getScrollTop,
    getOffset,
    getFocusedFromBlur,
    KeyCode,
    serializeArray,
    serializeObject,
};