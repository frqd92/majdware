export default function makeDraY(parent, child){

  let isDragging = false;
  let currentY;
  
  child.addEventListener("mousedown", e => {
    isDragging = true;
    currentY = e.clientY - parent.offsetTop;
  });
  
  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    let top = e.clientY - currentY;
  
    // Check if the div is going out of bounds
    if (top < 0) {
      top = 0;
    } else if (top + parent.offsetHeight > window.innerHeight) {
      top = window.innerHeight - parent.offsetHeight;
    }
  
    parent.style.top = `${top}px`;
  });
  
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}