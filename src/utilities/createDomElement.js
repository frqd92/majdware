export default function elementCreator(type, selector,text, parent, isPrepend){
    const element = document.createElement(type);
    if(selector){
        if(selector[0]==="class"){
            for(let i=1;i<selector.length;i++)
            element.classList.add(selector[i])
        }
        else if(selector[0]==="id"){
            element.id=selector[1];
        }
    }
    if(text){
        element.innerText = text;
    }
    if(parent){
        !isPrepend?parent.appendChild(element):parent.prepend(element);
    }
    return element;
}

export function svgFunc(element, alt, parent){
    const img = document.createElement("img");
    img.src= element;
    img.alt = alt;
    parent.appendChild(img);
    return img;
}