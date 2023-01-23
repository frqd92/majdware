import elementCreator from "./utilities/createDomElement";
import '/src/styles/addCompany.css'
export default function addCompanyModal(){
    if(document.querySelector(".add-company-modal")===null){
        createModal();
    }
}

function createModal(){
    const modalDiv = elementCreator("div", ["class", "add-company-modal"], false, document.body);
    elementCreator("p", ["class", "add-modal-text"], "Company Adder", modalDiv);
    const inputDiv = elementCreator("div", ["class", "modal-input-div"], false, modalDiv)
    createInput(inputDiv);

    elementCreator("button", ["id", "modal-add-btn"], "Save", modalDiv);

}

function createInput(inputDiv){
    elementCreator("input", ["class", "modal-input"], false, inputDiv);
    elementCreator("div", ["class", "modal-arrow"], "↧", inputDiv)

}