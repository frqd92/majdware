import elementCreator from "./utilities/createDomElement";
import { readCompanyData } from ".";
export let currentFactory = "";
export let snapshotArr = []; //main array for Firebase current factory
export let mainSnapshotArr = [];

export function feedTables(arr){
    const table = document.getElementById("main-table");
    let newAdded = 0;
    arr.forEach((elem, index)=>{
        newAdded++;
        const tableRow = elementCreator("tr", ["class", "table-row"], false, table);
        const classListArr = ["","td-num", "td-date", "td-desig", "td-credit", "td-debit", "td-saldo"];
        const objKeyArr = ["","", elem.date, elem.des, elem.credito, elem.debito, elem.saldo];
        for(let i=1;i<7;i++){
            elementCreator("td", ["class", "table-td", `${classListArr[i]}`], `${objKeyArr[i]}`, tableRow);
        }
    })
    console.log(newAdded)
    updateNum(arr);

}


function updateNum(arr){
    console.log(arr);
    const numbers = document.querySelectorAll(".td-num");
    for(let i=0;i<arr.length;i++){
        numbers[i].innerHTML = i;
    }
}

export function currentFact(fact){
    currentFactory = fact
    return currentFactory;
}

export function updateSnapshot(arr){
    snapshotArr = arr;
}
