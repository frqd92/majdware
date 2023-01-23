import elementCreator from "./utilities/createDomElement";
import majdImg from '/src/Assets/majd.png'
export default function loginPage(){
    const div = elementCreator("div", ["class", "login-div"], false, document.body);
    const img = document.createElement("img");
    img.src= majdImg;
    img.id= "majd-image";
    div.appendChild(img);
    const title = elementCreator("h1", ["id", "login-title"], "MAJDWARE", div);
    const button = elementCreator("button", ["id", "login-btn"], "إتفـَضّـَل", div);
}

