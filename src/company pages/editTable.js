import elementCreator from "/src/utilities/createDomElement";
import { snapshotArr, currentFactory } from "../arrayTracker";
import { writeMovements } from "..";
import '/src/styles/editTable.css'
export default function editCellFunc(e){
    if(document.querySelector(".edit-input")===null){
        let origVal = e.target.innerText;
        const cell = e.target;
        const parentRow = e.target.parentElement;
        const editIndex = parentRow.querySelector(".td-num").innerText;
        cell.innerText = "";
        const editInput = elementCreator("input", ["class", "edit-input"], false, e.target);
        editInput.value = origVal;
        editInput.select();

        // console.log(snapshotArr)

        window.addEventListener("keydown", removeInput);
        function removeInput(e){
            if(e.key==="Escape"){
                editInput.remove();
                cell.innerText=origVal;
                window.removeEventListener("click", removeInput);
            }
            if(e.key==="Enter"){
                if(editInput.value===""){
                    editInput.remove();
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
                    editInput.remove();
                    window.removeEventListener("click", removeInput);
                }

            }
        }
    }
    }


function editObj(index,cell ,value){
    console.log(snapshotArr[index])

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
