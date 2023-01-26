export default function makeDraggable (element, cl) {
    let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;

    if (element.querySelector(`.${cl}`)) {
        element.querySelector(`.${cl}`).onmousedown = dragMouseDown;
    } 
    else {
        element.onmousedown = dragMouseDown;
    }
    function dragMouseDown (e) {
        e.preventDefault();
        previousPosX = e.clientX;
        previousPosY = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag (e) {
        e.preventDefault();
        currentPosX = previousPosX - e.clientX;
        currentPosY = previousPosY - e.clientY;

        previousPosX = e.clientX;
        previousPosY = e.clientY;


        element.style.top = (element.offsetTop - currentPosY) + 'px';
        element.style.left = (element.offsetLeft - currentPosX) + 'px';
    }

    function closeDragElement () {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
