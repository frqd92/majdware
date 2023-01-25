import elementCreator from "/src/utilities/createDomElement";
import btn from '/src/Assets/back.png';
import { getUserInfo } from '/src/index';
import generateMain from "../mainPage";
import '/src/styles/companyPage.css';
import { child } from "firebase/database";

export function makeFactoryPage(e){
    document.querySelector(".welcome-text").style.display = "none"; 
    document.querySelector(".company-div").style.display = "none"; 
    document.body.classList.add("body-factory");
    generateHeader(e);
}







function generateMainFactory(){
    const main = elementCreator("div", ["class", "factory-main"], false, document.body);

}

function generateHeader(e){
    const header = elementCreator("div", ["class", "factory-header"], false,document.body);

    const backBtnDiv = elementCreator("div", ["class", "back-btn-div"], false, header);
    const backBtn = document.createElement("img");
    backBtn.src = btn;
    backBtn.id = "factory-back-btn";
    backBtnDiv.appendChild(backBtn);
    elementCreator("p", false, "العودة إلى الصفحة الرئيسية", backBtnDiv);

    elementCreator("h1", ["class", "factory-header-title"], `${e.target.innerText}`, header);

    const infoDiv = elementCreator("div", ["class", "factory-info-div"], false, header);
    const namePicDiv = elementCreator("div", ["class", "factory-namePic-div"], false, infoDiv)
    elementCreator("p", ["class", "factory-user-name"],`${getUserInfo("name")}`, namePicDiv);
    const profilePic = document.createElement("img");
    profilePic.src = getUserInfo("profile-pic");
    namePicDiv.appendChild(profilePic);
    elementCreator("p", ["class", "factory-header-date"], `${getDate()}`, infoDiv);
    
    backBtn.addEventListener("click", backHome, {once:true})
  
}


function backHome(){
    const children = document.querySelectorAll("body > *");
    children.forEach(elem=>{
        if(elem.classList[0]!=="welcome-text" && elem.classList[0]!=="company-div"){
            elem.remove();
        }
    })
    document.querySelector(".welcome-text").style.display = "block"; 
    document.querySelector(".company-div").style.display = "flex"; 
    document.body.classList.remove("body-factory");
}







function getDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();

    today = dd + '/' + mm + '/' + yy;
    return today
}