import elementCreator from "./utilities/createDomElement";
import editCellFunc from "./company pages/editTable";
import { calculateSaldo } from "./company pages/makeRow";
import { recalculateTable } from "./company pages/editTable";
import { writeMovements } from ".";
export let currentFactory = "";
export let snapshotArr = []; //main array for Firebase current factory
export let mainSnapshotArr = [];

export let desigArray = [];
export function updateDesig(arr){
    desigArray = arr;
    console.log(desigArray);
}


export function feedTables(sortArr){
    const arr = sortByDate(sortArr)
    const table = document.getElementById("main-table");
    clearTable(table);
    arr.forEach(elem=>{
        const tableRow = elementCreator("tr", ["class", "table-row"], false, table);
        const classListArr = ["","td-num", "td-date", "td-desig", "td-credit", "td-debit", "td-saldo"];
        const objKeyArr = ["","", elem.date, elem.des, elem.credito, elem.debito, elem.saldo];
        for(let i=1;i<7;i++){
            const td = elementCreator("td", ["class", "table-td", `${classListArr[i]}`], `${objKeyArr[i]}`, tableRow);
            if(i===2 || i===3 || i===4 || i===5){
                td.addEventListener("dblclick", editCellFunc);
            }
        }
        deleteRowFunc(tableRow);
    })
    calculateSaldo();
    updateNum();
    recalculateTable()
}


function clearTable(table){
    const allRows = table.querySelectorAll(".table-row");
    allRows.forEach(row=>row.remove());
}
export function sortByDate(arr){
    return arr.sort((a, b)=>{
        const dateA = formateDate(a.date);
        const dateB = formateDate(b.date);
        return dateA-dateB
    })
    
    function formateDate(date){
        let [dd,mm,yy]= date.split("/");
        yy= "20"+yy;
        return new Date(`${yy}/${mm}/${dd}`)
        

    }


}



function deleteRowFunc(row){
    const numCell = row.querySelector(".td-num");
    numCell.addEventListener("mouseover", createDel);
    numCell.addEventListener("mouseleave", removeDel);
    numCell.addEventListener("mousedown", timerLogic);
    function timerLogic(){
        numCell.addEventListener("mouseup", removeTimer);
        numCell.addEventListener("mouseleave", removeTimer);
        if(row.querySelector(".moving-delete")===null)elementCreator("div", ["class", "moving-delete"], false, numCell)
        const timer = setTimeout(()=>{
            removeRow();
            
        }, 1000)

        function removeTimer(){
            if(row.querySelector(".moving-delete"))row.querySelector(".moving-delete").remove();
            clearTimeout(timer);
        }
    }

    function removeRow(){
        row.style.background="rgba(222, 101, 101, 0.432)";
        setTimeout(()=>{
            row.style.opacity = "0";
        }, 600)
        setTimeout(()=>{
            const index = Number(numCell.innerText.split("").shift());
            snapshotArr.splice(index, 1)
            row.remove();
            recalculateTable();
            updateNum();
            writeMovements(snapshotArr, currentFactory);
        }, 800)

    }

    function createDel(){
        if(row.querySelector(".td-num-close")===null){
            const xClose = elementCreator("div", ["class", "td-num-close"], "X", numCell);
        }
    }
    function removeDel(){
        row.querySelector(".td-num-close").remove()
    }
}

function updateNum(){
        const numbers = document.querySelectorAll(".td-num");
        for(let i=0;i<snapshotArr.length;i++){
            numbers[i].innerHTML =i;
            snapshotArr[i].num=i;
        }

}

export function currentFact(fact){
    currentFactory = fact
    return currentFactory;
}

export function updateSnapshot(arr){
    snapshotArr = arr;
}
