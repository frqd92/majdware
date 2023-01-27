import elementCreator from "../utilities/createDomElement";
import { movAdder } from "./makeRow";


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


export function generateTable(div){
    const table = elementCreator("table", ["id", "main-table"], false, div);
    const tableHeader = elementCreator("tr", ["class", "table-header"], false, table);
    for(let i=0;i<6;i++){
        switch(i){
            case 0: elementCreator("th", ["class", "table-th"], "Nº", tableHeader); break;
            case 1: elementCreator("th", ["class", "table-th"], "Data", tableHeader); break;
            case 2: elementCreator("th", ["class", "table-th"], "Designação", tableHeader); break;
            case 3: elementCreator("th", ["class", "table-th"], "Crédito", tableHeader); break;
            case 4: elementCreator("th", ["class", "table-th"], "Débito", tableHeader); break;
            case 5: elementCreator("th", ["class", "table-th"], "Saldo", tableHeader); break;
        }
    };
    document.getElementById("add-movimento-btn").addEventListener("click", movAdder);
    //feedTables()

}        


function feedTables(){
    const table = document.getElementById("main-table");
    arr.forEach((elem, index)=>{
        let keys = Object.keys(elem);
        let values = Object.values(elem);
        const tableRow = elementCreator("tr", ["class", "table-row"], false, table);
        for(let i=1;i<keys.length;i++){
            elementCreator("td", ["class", "table-td"], `${values[i]}`, tableRow);
        }
    })
}



// let entries = Object.entries(elem);


// console.log(keys);
// console.log(values);
// console.log(entries);


// function createrow(div){
//     const row = elementCreator("div", ["class", "adder-row"], false, div);
//     const dateDiv = elementCreator("div", ["class", "adder-date-div", "adder-td"], false, row);
//     const desigDiv = elementCreator("div", ["class", "adder-desig-div", "adder-td"], false, row);
//     for(let i=0;i<7;i++){
//         if(i===0 || i===1 || i===2){
//             elementCreator("input",["class", "adder-date-input"], false, dateDiv);
//             if(i===0 || i===1){
//                 elementCreator("div",["class", "adder-date-divider"], "/", dateDiv); 
//             }
//         }
//         if(i===3){
//             elementCreator("input", ["class", "adder-desig-input-num"], false, desigDiv);
//             elementCreator("input", ["class", "adder-desig-input"], false, desigDiv);
//         }
//         if(i===4){
//             elementCreator("input", ["class", "adder-credit-input", "adder-td"], false, row);
//         }
//         if(i===5){
//             elementCreator("input", ["class", "adder-debit-input", "adder-td"], false, row);
//         }
//         if(i===6){
//             elementCreator("input", ["class", "adder-saldo-input", "adder-td"], false, row);
//         }

//     }
//     adderInputLogic();
//     arrowLogic();
// }

