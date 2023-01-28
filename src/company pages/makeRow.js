import elementCreator from "../utilities/createDomElement";
import makeDraY from "../utilities/makeDraggableYaxis";
import arrowDown from '/src/Assets/arrow-down-other.png';
import { mainArray, feedTables, tempArray, currentFactory } from "../arrayTracker";
function renderToTable(fact){
    const allRows = document.querySelectorAll(".adder-row");

    allRows.forEach((elem, index)=>{
        const obj = {};

        obj.factory = fact;
        obj.num = 0;
        const rowDates = elem.querySelectorAll(".adder-date-input");
        obj.date = rowDates[0].value + "/" + rowDates[1].value + "/" + rowDates[2].value;

        const faturaNum = elem.querySelector(".adder-desig-input-num").value;
        const desig = elem.querySelector(".adder-desig-input").value;
        obj.des = `${faturaNum} ${desig}`;

        obj.credito = elem.querySelector(".adder-credit-input").value;
        obj.debito = elem.querySelector(".adder-debit-input").value;
        obj.saldo = elem.querySelector(".adder-saldo-input").value;

        mainArray.push(obj);
        tempArray.push(obj);
    })

    feedTables();
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
    const desigDiv = elementCreator("div", ["class", "adder-desig-div", "adder-td"], false, row);
    const desigNum = elementCreator("input", ["class", "adder-desig-input-num"], false, desigDiv);
    desigNum.placeholder="nº";
    const desigInput = elementCreator("input", ["class", "adder-desig-input"], false, desigDiv);
    const creditInput = elementCreator("input", ["class", "adder-credit-input", "adder-td"], false, row);
    const debitInput = elementCreator("input", ["class", "adder-debit-input", "adder-td"], false, row);
    const saldoInput = elementCreator("input", ["class", "adder-saldo-input", "adder-td"], false, row);
   
        //datelogic
        dd.addEventListener("input",(e)=>{
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
            onlyNumbers(yy, e);
            if(yy.value.length>1){
                desigNum.focus();
                desigNum.select();
            }
        });

        //desig
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
            if(desigInput.value.length===1 && e.inputType!=="deleteContentBackward"){
                if(e.data.toLowerCase()==="t"){
                    desigInput.value="Transporte ";
                }
                else if(e.data.toLowerCase()==="i"){
                    desigInput.value="Invoice ";
                }
            }
        })
        //debit/credit
        emptyZero(creditInput);
        emptyZero(debitInput);
        debitInput.addEventListener("focusout", calculateSaldo);
        creditInput.addEventListener("focusout", calculateSaldo);

        //saldo
        saldoInput.addEventListener('paste', (e) => e.preventDefault());
        saldoInput.addEventListener("input", ()=>{saldoInput.value="";})
        saldoInput.addEventListener("focus", calculateSaldo);
        saldoInput.addEventListener("focusout", calculateSaldo);


        //functions
        function onlyNumbers(input, e){
            if(isNaN(e.data)){input.value = input.value.split("").slice(0,-1).join("");}
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


        function calculateSaldo(){
            const allSaldo = document.querySelectorAll(".adder-saldo-input");
            const allCredito = document.querySelectorAll(".adder-credit-input");
            const allDebito = document.querySelectorAll(".adder-debit-input");
            const lastSaldo = [...document.querySelectorAll(".td-saldo")].pop();
            let lastValue=0;
            if(lastSaldo!==undefined){
                lastValue = lastSaldo.textContent;
            }
    
            for(let i=0;i<allSaldo.length;i++){
                if(i===0){
                    allSaldo[0].value =Number(lastValue) + Number(allDebito[0].value) - Number(allCredito[0].value);
                }
                else{
                    allSaldo[i].value = Number(allSaldo[i-1].value) + Number(allDebito[i].value) - Number(allCredito[i].value);
                }
            }
        }






    return Object.assign({}, {row});
    
}



export function movAdder(){
    const adderDiv = elementCreator("div", ["class", "adder-div"], false, document.body);
    const adderHead = elementCreator("div", ["class", "adder-upper"], false, adderDiv);
    makeDraY(adderDiv, adderHead);
    const closeBtn = elementCreator("p", ["class", "adder-head-close"], "X", adderHead);
    closeBtn.addEventListener("click", ()=>{adderDiv.remove()})
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
        const factory = document.querySelector(".factory-header-title").innerText;
        renderToTable(factory);
        adderDiv.remove();
    })
}


