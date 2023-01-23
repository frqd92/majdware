import elementCreator from "./utilities/createDomElement";
import '/src/styles/main.css'
export default function generateMain(username){
    document.body.innerHTML="";
    const welcomeText = elementCreator("p", ["class", "welcome-text"],`${username} أهلا وسهلا`, document.body);
    const companyDiv = elementCreator("div", ["class", "company-div"], false, document.body);
    const title = elementCreator("p", ["class", "title-text"],'Companies', companyDiv);
    const searchBar = elementCreator("input", ["id", "search-bar"], false,companyDiv )
    searchBar.placeholder = "Search for company";
    const listCompaniesDiv = elementCreator("div", ["class", "list-companies"], false, companyDiv);
    const btnDiv = elementCreator("div", ["class", "btn-div"], false, companyDiv)
    const addCompany = elementCreator("button", ["id", "add-company-btn"], "+", btnDiv);
}


