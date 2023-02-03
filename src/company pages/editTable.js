import elementCreator from "/src/utilities/createDomElement";
import { snapshotArr, currentFactory } from "../arrayTracker";
import { writeMovements } from "..";
import { defilterTable } from "../filterByDate";
import '/src/styles/editTable.css'
import numeral from "numeral";
export default function editCellFunc(e){
    if(document.querySelector(".edit-input")===null){
        let origVal = e.target.innerText;
        const cell = e.target;
        const parentRow = e.target.parentElement;
        const editIndex = parentRow.querySelector(".td-num").innerText;
        cell.innerText = "";
        const inputDiv = elementCreator("div", ["class", "edit-input-div"], false, e.target)
        const editInput = elementCreator("input", ["class", "edit-input"], false, inputDiv);
        if(!cell.classList.contains("td-desig") && !cell.classList.contains("td-date")){
            numberInput(editInput);
        }
        if(cell.classList.contains("td-date")){
            editInput.classList.add("edit-date-input")
            dateInput(editInput);
        }
        editInput.value = origVal;
        editInput.select();


        window.addEventListener("keydown", removeInput);
        function removeInput(e){
            if(e.key==="Escape"){
                inputDiv.remove();
                cell.innerText=origVal;
                window.removeEventListener("click", removeInput);
            }
            if(e.key==="Enter"){
                if(editInput.value===""){ //if field is empty
                    inputDiv.remove();
                    cell.innerText=origVal;
                    window.removeEventListener("click", removeInput);
                }
                else{
                    origVal=editInput.value;
                    snapshotArr.forEach((elem, index)=>{
                        if(index==editIndex){
                            editObj(editIndex,cell, origVal)
                        }
                    })
                    cell.innerText=origVal;
                    inputDiv.remove();
                    window.removeEventListener("click", removeInput);
                    recalculateTable(editIndex);
                }

            }
        }
    }
}


function dateInput(dateInput){
    dateInput.addEventListener("input", (e)=>{
        if(isNaN(e.data) || dateInput.value.length > 10){
            dateInput.value = dateInput.value.split("").slice(0,-1).join("");
        }
        if(dateInput.value.length===2 ||dateInput.value.length===5 ){
            dateInput.value+="/";
        }
        if(dateInput.value.length===10){
            dateInput.value = dateInput.value.split("").filter((el, i)=>{
                if(i!==6 && i!==7) return el
            }).join("");
        }
        if(e.inputType === "deleteContentBackward"){
            dateInput.value = "";
        }
        if(dateInput.value.length<8){
            dateInput.classList.add("invalid-date-edit");
        }
        else{
            dateInput.classList.remove("invalid-date-edit")
        }
    })
}


function recalculateTable(){
    clearIfFilter();
    const allRows = document.querySelectorAll(".table-row");

    allRows.forEach((elem, index)=>{
        let tdCredit = elem.querySelector(".td-credit");
        let tdDebit = elem.querySelector(".td-debit");
        let tdSaldo = elem.querySelector(".td-saldo");

        if(index===0){
            const val = rmvFor(tdDebit.innerText) - rmvFor(tdCredit.innerText);
            tdSaldo.innerText = numeral(val).format("0,0");
        }
        else{
            const prevSaldo = allRows[index-1].querySelector(".td-saldo");
            const val = rmvFor(prevSaldo.innerText) + (rmvFor(tdDebit.innerText) - rmvFor(tdCredit.innerText))
            tdSaldo.innerText =  numeral(val).format("0,0");;
        }

    })
    function rmvFor(val){
        return Number(val.replaceAll(",", ""));

    }


    function clearIfFilter(){
        defilterTable();
        document.querySelectorAll(".mini-input").forEach(elem=>{
            elem.value="";
        })
        document.querySelectorAll(".date-filter").forEach(elem=>{
            elem.classList.remove("valid-input-bg");
        })
    }


}

function numberInput(numInput){
    numInput.addEventListener("input", (e)=>{
        if(isNaN(e.data)){
            numInput.value = numInput.value.split("").slice(0,-1).join("");
        }
        else{
            numInput.value= numeral(numInput.value).format('0,0')
        }

    })
}

function editObj(index,cell ,value){

    if(cell.classList.contains("td-date")){
        snapshotArr[index].date = value;
    }
    else if(cell.classList.contains("td-desig")){
        snapshotArr[index].des = value;

    }
    else if(cell.classList.contains("td-credit")){
        snapshotArr[index].credito = value;
    }
    else if(cell.classList.contains("td-debit")){
        snapshotArr[index].debito = value;

    }
    writeMovements(snapshotArr, currentFactory);
}
