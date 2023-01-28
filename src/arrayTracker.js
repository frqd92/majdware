import elementCreator from "./utilities/createDomElement";
export let mainArray = [];
export let tempArray = [];
let currentFactory = "";
export function feedTables(){
    //
    const table = document.getElementById("main-table");
    tempArray.forEach((elem, index)=>{
        let keys = Object.keys(elem);
        let values = Object.values(elem);
        const tableRow = elementCreator("tr", ["class", "table-row"], false, table);
        const classListArr = ["","td-num", "td-date", "td-desig", "td-credit", "td-debit", "td-saldo"];
        for(let i=1;i<7;i++){
            elementCreator("td", ["class", "table-td", `${classListArr[i]}`], `${values[i]}`, tableRow);
        }
    })
    updateNum();
    tempArray=[];
}

function updateNum(){
    const numbers = document.querySelectorAll(".td-num");
    const filterFact = mainArray.filter(obj=>obj.factory===currentFactory)
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
