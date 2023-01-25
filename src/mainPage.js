import elementCreator from "./utilities/createDomElement";
import searchBarFunc from "./searchbar";
import addCompanyModal from "./addCompany";
import arrowDown from '/src/Assets/arrowDown.png';
import { getUserInfo } from ".";
import '/src/styles/companyList.css';
import '/src/styles/main.css'


export default function generateMain(){
    document.body.innerHTML="";
    elementCreator("p", ["class", "welcome-text"],`${getUserInfo("name")} أَهْلًا وَسَهْلًا`, document.body);
    const companyDiv = elementCreator("div", ["class", "company-div"], false, document.body);
    elementCreator("p", ["class", "title-text"],'Companies', companyDiv);
    const searchBar = elementCreator("input", ["id", "search-bar"], false,companyDiv )
    searchBar.placeholder = "Search";
    const listCompaniesDiv = elementCreator("div", ["class", "list-companies"], false, companyDiv);
    const btnDiv = elementCreator("div", ["class", "btn-div"], false, companyDiv)
    elementCreator("button", ["id", "add-company-btn"], "+", btnDiv);
    btnDiv.addEventListener("click", addCompanyModal);
    searchBarFunc();

    if(listCompaniesDiv.children.length===0){
        emptyCompanyList(listCompaniesDiv);
    }
}

function emptyCompanyList(div){
    const otherDiv = elementCreator("div", ["class", "empty-company"], false, div);
    elementCreator("p", false, `List is empty.\nClick on the button below to add a company.`, otherDiv)

    const arrow = document.createElement("img");
    arrow.src = arrowDown;
    otherDiv.appendChild(arrow)
}

