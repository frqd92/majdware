import elementCreator from "/src/utilities/createDomElement";
import btn from '/src/Assets/back.png';
import { getUserInfo } from '/src/index';
import '/src/styles/companyPage.css';
import { clearShit } from "../searchbar";
import arrowImg from '/src/Assets/arrow-other.png';
export function makeFactoryPage(e){
    document.querySelector(".welcome-text").style.display = "none"; 
    document.querySelector(".company-div").style.display = "none"; 
    document.body.classList.add("body-factory");
    generateHeader(e);
    generateMainFactory();
}



function generateMainFactory(){
    const main = elementCreator("div", ["class", "factory-main"], false, document.body);
    const movimentos = elementCreator("h1", ["class", "movimentos-title"], "Movimentos de Contas Correntes", main);
    const exportBtn = elementCreator("button", ["id", "export-btn"], "EXPORT", main);
    const filterDiv = elementCreator("div", ["class", "filter-div"], false, main);
    const movimentosDiv = elementCreator("div", ["class", "movimentos-div"], false, main);

    filterDate(filterDiv);
}



function filterDate(div){
    elementCreator("p", ["class", "filter-text"], "Date Range ", div);
    const miniInputDiv = elementCreator("div", ["class", "mini-inputs-div"], false, div);

    for(let i=0;i<6;i++){
        if(i<3){
            elementCreator("input", ["class", "mini-input", "mini-input-left"], false, miniInputDiv);
        }
        else{
            elementCreator("input", ["class", "mini-input", "mini-input-right"], false, miniInputDiv);
        }

        if(i!==5){
            if(i!==2){
                elementCreator("span", ["class", "mini-input-slash"], "/", miniInputDiv);
            }
            else{
                const arrowDiv = elementCreator("span", ["class", "mini-input-arrow"], false, miniInputDiv);
                const arrow = document.createElement("img");
                arrow.src= arrowImg;
                arrowDiv.appendChild(arrow);
            }
    
        }

        
    }

}

function dateInputLogic(dateInput){




    
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
    backBtn.addEventListener("mouseover", ()=>{
        document.querySelector(".back-btn-div > p").style.opacity="1";
    })
    backBtn.addEventListener("mouseleave", ()=>{
        document.querySelector(".back-btn-div > p").style.opacity="0";
    })
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
    clearShit();
}

function getDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yy = today.getFullYear();

    today = dd + '/' + mm + '/' + yy;
    return today
}


