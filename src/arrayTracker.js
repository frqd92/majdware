import elementCreator from "./utilities/createDomElement";
import { readCompanyData } from ".";
export let mainArray = [];
export let tempArray = [];
export let currentFactory = "";
export let snapshotArr = [];

export function feedTables(arr){
    const table = document.getElementById("main-table");

    arr.forEach((elem, index)=>{
        const tableRow = elementCreator("tr", ["class", "table-row"], false, table);
        const classListArr = ["","td-num", "td-date", "td-desig", "td-credit", "td-debit", "td-saldo"];
        const objKeyArr = ["","", elem.date, elem.des, elem.credito, elem.debito, elem.saldo];
        for(let i=1;i<7;i++){
            elementCreator("td", ["class", "table-td", `${classListArr[i]}`], `${objKeyArr[i]}`, tableRow);
        }
    })
    updateNum(arr);

}


function updateNum(arr){
    const numbers = document.querySelectorAll(".td-num");
    const filterFact = arr.filter(obj=>obj.factory===currentFactory);
    for(let i=0;i<filterFact.length;i++){
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