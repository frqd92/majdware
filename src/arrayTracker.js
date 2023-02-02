import elementCreator from "./utilities/createDomElement";
import editCellFunc from "./company pages/editTable";
export let currentFactory = "";
export let snapshotArr = []; //main array for Firebase current factory
export let mainSnapshotArr = [];

export function feedTables(arr){
    const table = document.getElementById("main-table");
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
    })
    updateNum();

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
