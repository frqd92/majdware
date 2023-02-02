import elementCreator from "/src/utilities/createDomElement";
import btn from '/src/Assets/back.png';
import { getUserInfo } from '/src/index';
import '/src/styles/companyPage.css';
import '/src/styles/movimentos.css';
import { clearShit } from "../searchbar";
import filterDate from "../utilities/filterDateInput";
import { generateTable } from "./tableLogic";
import {currentFact, currentFactory, updateSnapshot} from "/src/arrayTracker"
import { readCompanyData } from "..";
import { movAdder } from "./makeRow";
import { exportBtnEvents } from "../export";

export function makeFactoryPage(e){
    if(document.querySelector(".table-row")===null){
        updateSnapshot([]);
    }
    document.querySelector(".welcome-text").style.display = "none"; 
    document.querySelector(".company-div").style.display = "none"; 
    document.body.classList.add("body-factory");
    generateHeader(e);
    generateMainFactory(e);
    readCompanyData(currentFactory);
  
}


function generateMainFactory(e){
    const main = elementCreator("div", ["class", "factory-main"], false, document.body);
    const movimentos = elementCreator("h1", ["class", "movimentos-title"], "Movimentos de Contas Correntes", main);
    const exportBtn = elementCreator("button", ["id", "export-btn"], "EXPORT", main);
    const filterDiv = elementCreator("div", ["class", "filter-div"], false, main);
    filterDate(filterDiv);

    const addMovimentoBtn = elementCreator("button", ["id", "add-movimento-btn"], "+", main);
    const tableDiv = elementCreator("div", ["class", "table-div"], false, main);
    generateTable(tableDiv)

    exportBtnEvents(exportBtn);
    addMovimentoBtn.addEventListener("click", ()=>{
        if(document.querySelector(".adder-div")===null){
            movAdder()
        }
        else{
            document.querySelector(".adder-div").style.display="flex";
            document.querySelector(".bg-div-adder").style.display="block";
        }

    })
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
    currentFact(e.target.innerText);
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


