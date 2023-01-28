import elementCreator from "./utilities/createDomElement";
export let mainArray = [];
export let tempArray = [];

export function feedTables(){
    const table = document.getElementById("main-table");
    tempArray.forEach((elem, index)=>{
        let keys = Object.keys(elem);
        let values = Object.values(elem);
        const tableRow = elementCreator("tr", ["class", "table-row"], false, table);
        for(let i=0;i<keys.length;i++){
            elementCreator("td", ["class", "table-td"], `${values[i]}`, tableRow);
        }
    })
    tempArray=[];
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
