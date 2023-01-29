import elementCreator from "./utilities/createDomElement";
export let mainArray = [];
export let tempArray = [];
export let currentFactory = "";

export function feedTables(isFirebase, firebaseArr){
    const table = document.getElementById("main-table");
    let arr = tempArray;
    if(isFirebase){
        document.querySelectorAll(".table-row").forEach(elem=>{elem.remove();})
        arr = firebaseArr;
    }

    arr.forEach((elem, index)=>{
        const tableRow = elementCreator("tr", ["class", "table-row"], false, table);
        const classListArr = ["","td-num", "td-date", "td-desig", "td-credit", "td-debit", "td-saldo"];
        const objKeyArr = ["","", elem.date, elem.des, elem.credito, elem.debito, elem.saldo];
        for(let i=1;i<7;i++){
            elementCreator("td", ["class", "table-td", `${classListArr[i]}`], `${objKeyArr[i]}`, tableRow);
        }
    })
    updateNum(arr);
    tempArray=[];
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
}
const testObject = {
    factory: "alexandrino",
    num: 0,
    date: "22/01/23",
    des: "9 tiles inv",
    credito: 100000,
    debito: 120000,
    saldo : -20000,
}
const testObject2 = {
    factory: "alexandrino",
    num: 1,
    date: "23/01/23",
    des: "10 transporte tiles",
    credito: 130000,
    debito: 140000,
    saldo : -10000,
}
const arr = [testObject, testObject2];
