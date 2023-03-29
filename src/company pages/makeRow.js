import elementCreator from "../utilities/createDomElement";
import makeDraY from "../utilities/makeDraggableYaxis";
import arrowDown from '/src/Assets/arrow-down-other.png';
import {writeMovements, writeDesig, readDesig} from "/src/index.js";
import { snapshotArr, feedTables, sortByDate, desigArray } from "../arrayTracker";
import numeral from 'numeral';
import { recalculateTable } from "./editTable";


function renderToTable(fact){
    const allRows = document.querySelectorAll(".adder-row");
    let  tempArray = [];
    allRows.forEach((elem, index)=>{
        const obj = {};
        obj.factory = fact;
        obj.num = 0;
        const rowDates = elem.querySelectorAll(".adder-date-input");
        obj.date = rowDates[0].value + "/" + rowDates[1].value + "/" + rowDates[2].value;
        const desigNum = elem.querySelector(".adder-desig-num").value
        const desig = elem.querySelector(".adder-desig-input").value;
        obj.des = `${desigNum} ${desig}`;
        obj.credito = elem.querySelector(".adder-credit-input").value;
        obj.debito = elem.querySelector(".adder-debit-input").value;

        tempArray.push(obj);
    })
    tempArray.forEach((elem)=>{
        snapshotArr.push(elem);
    });
    writeMovements(sortByDate(snapshotArr), fact);
    feedTables(sortByDate(snapshotArr), false);
    tempArray=[];
    recalculateTable()
}   



function desigDropFunc(div){
    const arrowDiv = elementCreator("div", ["class", "desig-drop-arrow-div"], false, div);
    const relativeDiv = elementCreator("div", ["class", "desig-rel"], false, arrowDiv)
    const arrow = elementCreator("span", ["class",  "desig-drop-arrow"], ">", relativeDiv)
    const menu = elementCreator("div", ["class", "desig-drop-menu"], false, div);
    checkForDesig();
    const menuAddBtn = elementCreator("div", ["class", "desig-add-desig"], "أضف رمزًا جديدًا", menu);
    menuAddBtn.addEventListener("click", addNewDesig);
    arrowDiv.addEventListener("click", desigArrowFunc);
    function desigArrowFunc(){
        if(!this.className.includes("desig-drop-clicked")){
            checkIfOtherAreOpen();
            this.classList.add("desig-drop-clicked");
            arrow.classList.add("desig-drop-arrow-on");
            menu.classList.add("desig-drop-menu-on");
            window.addEventListener("click", closeDropClick)
            checkForDesig()
        }
        else{
            closingElements()
        }
    }

    function checkForDesig(){
        if(desigArray.length<1) return
        const allRows = menu.querySelectorAll(".desig-drop-row");
        allRows.forEach(row=>row.remove());
        desigArray.forEach(elem=>{
            const newDesig = DesigFact(elem.code, elem.desigName);
            menu.prepend(newDesig);
        })
        
    }

    function addNewDesig(){
        if(div.querySelector(".add-new-desig")!==null) return
        const inputDiv = elementCreator("div", ["class", "add-new-desig"], false, menu, true);
        const codeInput = elementCreator("input", false, false, inputDiv); 
        codeInput.focus();
        const nameInput = elementCreator("input", false, false, inputDiv);
        const addBtn = elementCreator("p", false, "+", inputDiv);
        addBtn.addEventListener("click", addNewDesig);
        window.addEventListener("keydown", cancelNewDesig);
        codeInput.addEventListener("input", (e)=>{
            if(isNaN(e.data)){
                codeInput.value = codeInput.value.split("").slice(0,-1).join("");
            }
            if(codeInput.value.length>1){
                const arr = codeInput.value.split("")
                codeInput.value = arr[0];
            }
            if(codeInput.value.length>0){
                nameInput.focus();
            }
        })
        function cancelNewDesig(e){
            if(e.key==="Escape"){
                window.removeEventListener("keydown", cancelNewDesig);
                div.querySelector(".add-new-desig").remove();
            }
        }

        function addNewDesig(e){
            checkIfCodeExists(codeInput.value)
            if(codeInput.value.length<1){
                codeInput.classList.add("invalid-input-desig");
                return;
            }
            if(nameInput.value.length<1){
                nameInput.classList.add("invalid-input-desig");
                return;
            }
            if(checkIfCodeExists(codeInput.value)){
                codeInput.classList.add("invalid-input-desig");
                return;
            }
            else{
                const newDesig = DesigFact(codeInput.value, nameInput.value)
                menu.prepend(newDesig);
                const obj = {
                    code: codeInput.value,
                    desigName: nameInput.value
                }
                desigArray.push(obj);
                writeDesig(desigArray);
                window.removeEventListener("keydown", cancelNewDesig);
                div.querySelector(".add-new-desig").remove();
                e.stopPropagation()
            }
        }

    }

    function checkIfCodeExists(val){
        const allCodes = menu.querySelectorAll(".desig-drop-value")
        let bool = false;
        allCodes.forEach(code=>{
            const num = Number(code.innerText.split(" ").shift());
            if(num===Number(val)) return bool=true;
        })
        return bool;
    }
    function DesigFact(code, name){
        const desigDropDiv = elementCreator("div", ["class", "desig-drop-row"], false);
        const desigBtn = elementCreator("div", ["class", "desig-drop-value"], code + " "+ name, desigDropDiv);
        const deleteBtn = elementCreator("div", false, "X", desigDropDiv);
        deleteBtn.addEventListener("click", deleteRow);

        desigBtn.addEventListener("click", chosenDesig);

        function chosenDesig(){
            const numInput = div.querySelector(".adder-desig-num");
            const desigInput = div.querySelector(".adder-desig-input");
            numInput.value = code;
            desigInput.value = name;
            closingElements()

        }
        function deleteRow(e){
            desigArray.forEach((elem, index)=>{
                if(elem.code===code){
                    desigArray.splice(index, 1);
                    writeDesig(desigArray);
                    desigDropDiv.remove()
                    return;
                }
            })
            e.stopPropagation()
        }
        return desigDropDiv;
    }

    function closeDropClick(e){
        if(!e.target.closest(".desig-drop-arrow-div") && !e.target.closest(".desig-drop-menu") ){
            closingElements()
        }
    }
    function closingElements(){
        menu.classList.remove("desig-drop-menu-on");
        arrow.classList.remove("desig-drop-arrow-on");
        arrowDiv.classList.remove("desig-drop-clicked");
        window.removeEventListener("click", closeDropClick)
    }


}







export const rowFact = ()=>{
    const row = document.createElement("div");
    row.classList.add("adder-row");

    const dateDiv = elementCreator("div", ["class", "adder-date-div", "adder-td"], false, row);
    const dd = elementCreator("input",["class", "adder-date-input"], false, dateDiv);
    const mm = elementCreator("input",["class", "adder-date-input"], false, dateDiv);
    const yy =  elementCreator("input",["class", "adder-date-input"], false, dateDiv);
    dd.placeholder="dd";
    mm.placeholder="mm";
    yy.placeholder="yy";
    dd.focus;

    const desigDiv = elementCreator("div", ["class", "adder-desig-div"], false, row);
    const desigDrop = desigDropFunc(desigDiv);
    const desigNum = elementCreator("input", ["class", "adder-desig-num"], false, desigDiv);
    const desigInput = elementCreator("input", ["class", "adder-desig-input"], false, desigDiv);



    const creditInput = elementCreator("input", ["class", "adder-credit-input", "adder-td"], false, row);
    const debitInput = elementCreator("input", ["class", "adder-debit-input", "adder-td"], false, row);
    const saldoInput = elementCreator("input", ["class", "adder-saldo-input", "adder-td"], false, row);
        //datelogic
        dd.addEventListener("input",(e)=>{
            if(dd.classList.contains("invalid-date")){dd.classList.remove("invalid-date")}
            addZero(dd);
            onlyNumbers(dd, e);
            if(dd.value > 31){
                dd.value= "";
            }
            if(dd.value.length>1){
                mm.focus();
                mm.select();
            }
        })
        mm.addEventListener("input",(e)=>{
            if(mm.classList.contains("invalid-date")){mm.classList.remove("invalid-date")}
            addZero(mm);
            onlyNumbers(mm, e);
            if(mm.value > 12){
                mm.value= "";
            }
            if(mm.value.length>1){
                yy.focus();
                yy.select();
            }
        })
        yy.addEventListener("input",(e)=>{
            if(yy.classList.contains("invalid-date")){yy.classList.remove("invalid-date")}
            onlyNumbers(yy, e);
            if(yy.value.length>1){
                desigNum.focus();
                desigNum.select();
            }
        });

        //desig
        desigNum.addEventListener("input", e=>{
            desigInput.value="";
            onlyNumbers(desigNum, e);
            if(desigNum.value.length>1){
                const arr = desigNum.value.split("")
                desigNum.value = arr[0];
            }
            if(desigNum.value.length>0){
                if(desigArray.length>0){
                    desigArray.forEach(elem=>{
                        if(Number(elem.code)===Number(desigNum.value)){
                            desigInput.value = elem.desigName;
                            return;
                        }
                    })
                }
                desigInput.focus();
  
            }
        })
        desigInput.addEventListener("input",(e)=>{
            if(desigInput.value.length>14){
                desigInput.style.fontSize = "0.95rem";
            }
            if(desigInput.value.length>18){
                desigInput.style.fontSize = "0.70rem";
            }
            else if(desigInput.value.length<15){
                desigInput.style.fontSize = "1.2rem";
            }

        })
        //debit/credit
        emptyZero(creditInput);
        emptyZero(debitInput);
        debitInput.addEventListener("focusout", calculateSaldo);
        creditInput.addEventListener("focusout", calculateSaldo);
        creditInput.addEventListener("input",(e)=> {
            calculateSaldo()
            creditInput.value= numeral(creditInput.value).format('0,0');
        });
        debitInput.addEventListener("input",()=> {
            calculateSaldo()
            debitInput.value= numeral(debitInput.value).format('0,0');
        });
        //saldo
        saldoInput.addEventListener('paste', (e) => e.preventDefault());
        saldoInput.addEventListener("input", ()=>{saldoInput.value="";})
        saldoInput.addEventListener("focus", calculateSaldo);
        saldoInput.addEventListener("focusout", calculateSaldo);
        

        arrowTraverse(row)
        deleteRow(row)

        //functions

        function onlyNumbers(input, e){
            if(isNaN(e.data)){
                input.value = input.value.split("").slice(0,-1).join("");
            }
        }
        function addZero(input, e){
            input.addEventListener("focusout", ()=>{
                if((input.value[0])!=="0" && input.value.length===1){
                    input.value = "0" + input.value;
                }
            });
        }
        function emptyZero(input){
            input.value="0";
            input.addEventListener("focus", ()=>{input.select()})
            input.addEventListener("focusout", ()=>{
                if(input.value.length===0){
                    input.value = "0";
                }
            });
        }

    return Object.assign({}, {row});
    
}

function checkIfOtherAreOpen(){
    const allDrops = document.querySelectorAll(".desig-drop-clicked");
    const allArrows = document.querySelectorAll(".desig-drop-arrow-on");
    const allMenus = document.querySelectorAll(".desig-drop-menu-on");
    if(allDrops){
        allDrops.forEach((drop, index)=>{
            drop.classList.remove("desig-drop-clicked");
            allArrows[index].classList.remove("desig-drop-arrow-on");
            allMenus[index].classList.remove("desig-drop-menu-on");
        })
    }
}
function deleteRow(row){
    const inputs = row.querySelectorAll("input");

    let arr=[];
    inputs.forEach((elem,index)=>{
        elem.addEventListener("keydown", (e)=>{
            if(e.key==="Shift"){
                arr.push("0");
            }
            if(e.key==="D" || e.key==="d"){
                arr.push("0");
            }
            if(arr.length===2 && document.querySelectorAll(".adder-row").length>1){
                row.remove();
            }
        })
        elem.addEventListener("keyup", ()=>{
            arr=[];
        })

    })



}
function arrowTraverse(row){
    const inputs = row.querySelectorAll("input");

    inputs.forEach((elem,index)=>{
        elem.addEventListener("keydown", (e)=>{
            if(e.key==="Enter"){
                if(index!==2){
                    elem.nextSibling.focus()
                }
                if(index===2){
                    inputs[3].focus();
                }
                if(index===5){
                    document.querySelector(".adder-header-row-div").appendChild(rowFact().row);
                    const nextFocus = document.querySelectorAll(".adder-date-input");
                    nextFocus[nextFocus.length-3].focus();
                }

            }
        })
    })

}



export function calculateSaldo(){
    const allSaldo = document.querySelectorAll(".adder-saldo-input");
    const allCredito = document.querySelectorAll(".adder-credit-input");
    const allDebito = document.querySelectorAll(".adder-debit-input");
    const lastSaldo = [...document.querySelectorAll(".td-saldo")].pop();
    let lastValue=0;
    if(lastSaldo!==undefined){
        lastValue = lastSaldo.textContent;
        lastValue = rmvFor(lastValue);
    }
    for(let i=0;i<allSaldo.length;i++){
        if(i===0){
            let value =lastValue + rmvFor(allDebito[0].value) - rmvFor(allCredito[0].value);
            allSaldo[0].value = numeral(value).format("0,0")
        }
        else{
            let value = allSaldo[i].value = rmvFor(allSaldo[i-1].value) + rmvFor(allDebito[i].value) - rmvFor(allCredito[i].value);
            allSaldo[i].value = numeral(value).format("0,0")
        }
    }
}


function rmvFor(val){
    return Number(val.replaceAll(",", ""));
}

export function movAdder(){
    const bgDiv = elementCreator("div", ["class", "bg-div-adder"], false, document.body);
    const adderDiv = elementCreator("div", ["class", "adder-div"], false, document.body);
    const adderHead = elementCreator("div", ["class", "adder-upper"], false, adderDiv);
    makeDraY(adderDiv, adderHead);
    const closeBtn = elementCreator("p", ["class", "adder-head-close"], "X", adderHead);
    closeBtn.addEventListener("click", ()=>{
        adderDiv.style.display="none";
        bgDiv.style.display="none";
    })
    const adderHeader = elementCreator("div", ["class", "adder-header"], false, adderDiv);
    for(let i=0;i<5;i++){
        switch(i){
            case 0:
                elementCreator("p", ["class", "adder-header-td"], "Data",adderHeader);
                break;
            case 1: 
                elementCreator("p", ["class", "adder-header-td"], "Designação",adderHeader);
                break;
            case 2: 
                elementCreator("p", ["class", "adder-header-td"], "Crédito" ,adderHeader);
                break;
            case 3: 
                elementCreator("p", ["class", "adder-header-td"], "Débito" ,adderHeader);
                break;  
            case 4: 
                elementCreator("p", ["class", "adder-header-td"], "Saldo" ,adderHeader);
                break;  
        }
    }
    const rowsDiv = elementCreator("div", ["class", "adder-header-row-div"], false, adderDiv);

    rowsDiv.appendChild(rowFact().row);
    const btnDiv = elementCreator("div", ["class", "adder-header-btn-div"], false, adderDiv);

    const newRowArrow = document.createElement("img");
    newRowArrow.src = arrowDown;
    newRowArrow.classList.add("new-row-arrow");
    btnDiv.appendChild(newRowArrow);


    newRowArrow.addEventListener("click", ()=>{
        rowsDiv.appendChild(rowFact().row);
    })
    
    const addToTableBtn = elementCreator("div", ["class", "add-to-table-btn"], "حفظ", btnDiv);
    addToTableBtn.addEventListener("click", ()=>{
        if(validateRows()){
            const factory = document.querySelector(".factory-header-title").innerText;
            renderToTable(factory);
            adderDiv.remove();
            bgDiv.remove()
        }
    })
}
function validateRows(){
    const allRows = document.querySelectorAll(".adder-row");
    let validDate = true;
    let invalid = [];
    allRows.forEach((elem, index)=>{
        const allInputs = elem.querySelectorAll("input");
        const dateInputs = elem.querySelectorAll(".adder-date-input");
        for(let i=0;i<3;i++){
            if(dateInputs[i].value.length==0){
                validDate = false;
                invalid.push([index,i])
            }
        }
    })

    for(let i=0;i<invalid.length;i++){
        const [rowIndex, dateIndex] = invalid[i];
        const date = allRows[rowIndex].querySelectorAll(".adder-date-input");

        date[dateIndex].classList.add("invalid-date")

    }
    return validDate?true:false;

}

