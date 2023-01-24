import elementCreator from "./utilities/createDomElement";
import '/src/styles/addCompany.css';
import makeDraggable from "./utilities/makeDraggable";
import { companyData } from "./mainArray";
import updateCompanyList from "./companyList";
export default function addCompanyModal(){
    if(document.querySelector(".add-company-modal")===null){
        createModal();
    }
}

function createModal(){
    const bgDiv =elementCreator("div", ["class", "modal-bg-div"], false, document.body);
    const modalDiv = elementCreator("div", ["class", "add-company-modal"], false, document.body);
    const modalUpper = elementCreator("div", ["class", "modal-upper"], false, modalDiv)
    const closeBtn = elementCreator("p", ["class", "close-modal-btn"], "X", modalUpper);
    elementCreator("p", ["class", "add-modal-text"], "Company Adder", modalDiv);

    const inputDiv = elementCreator("div", ["class", "modal-input-div"], false, modalDiv)
    createInput(inputDiv);
    makeDraggable(modalDiv)
    const saveBtn = elementCreator("button", ["id", "modal-add-btn"], "Save", modalDiv);

    bgDiv.addEventListener("click", ()=>{
        modalDiv.classList.add("modal-animation");
        setTimeout(()=>{
            modalDiv.classList.remove("modal-animation"); 
        }, 200)
    });

    closeBtn.addEventListener("click", ()=>{modalDiv.remove();bgDiv.remove();})
    window.addEventListener("keydown", (e)=>{
        if(e.key==="Escape"){modalDiv.remove();bgDiv.remove();}
    }, {once:true})
    saveBtn.addEventListener("click", saveCompanies, {once:true});
    modalDiv.addEventListener("keydown", e=>{
        if(e.key === "Enter"){
            saveCompanies()
        }
    })

    function saveCompanies(){
        const allInputs = document.querySelectorAll(".modal-input");
        allInputs.forEach(elem=>{
            if(elem.value){
                companyData(elem.value);
            };
        })
        updateCompanyList();
        modalDiv.remove();bgDiv.remove();
    }
}

function createInput(inputDiv){
    const allInputs = document.querySelectorAll(".modal-input");
    const div = elementCreator("div", ["class", "modal-input-and-text"], false, inputDiv);
    const inputNum = elementCreator("p", ["class", "modal-input-num"], false, div);
    const input = elementCreator("input", ["class", "modal-input"], false, div);
    input.focus();
    inputNum.innerText = allInputs.length;
    if(allInputs.length===0){
        console.log("shit")
        input.addEventListener("keydown",()=>{
            const hint = elementCreator("p", ["class", "input-hint"], "اضغط على زر السهم لأسفل لإضافة المزيد من الشركات", inputDiv);
            setTimeout(()=>{hint.remove();}, 3000)

        }, {once:true})
    }
    input.addEventListener("keydown", (e)=>{
        if((e.key==="ArrowDown") && input.value.length>0){
            createInput(inputDiv)
        }
    })
    return input;
}
