function getElementPos(elt){
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

    x+=document.body.scrollLeft;
    y+=document.body.scrollTop;

    return {
        x:x,
        y:y,
    };
}

export {
    getElementPos,
};