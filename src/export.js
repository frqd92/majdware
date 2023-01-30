import { snapshotArr, currentFactory } from "./arrayTracker";
import elementCreator from "./utilities/createDomElement";
import * as XLSX from 'xlsx';


export default function exportFunc(){
    const rows = visibleRows();
    const table = exportTable(visibleRows());

    var workbook = XLSX.utils.table_to_book(table,{ dateNF: 'dd-mm-yyyy;@', cellDates: true, raw: true});
    XLSX.writeFile(workbook, 'table.xlsx');
}


function visibleRows(){
    let arr = [];
    const rows = document.querySelectorAll(".table-row");
        rows.forEach((elem, index)=>{
            if(!elem.classList.contains("hidden-row")){
                arr.push(snapshotArr[index])
            }
        })
        return arr
}


function exportTable(rows){
    const table = document.createElement("table");
    const tableHeader = elementCreator("tr", ["class", "table-header"], false, table);

    for(let i=0;i<5;i++){
        switch(i){
            case 0: elementCreator("th", false, "Data", tableHeader); break;
            case 1: elementCreator("th", false, "Designação", tableHeader); break;
            case 2: elementCreator("th", false, "Crédito", tableHeader); break;
            case 3: elementCreator("th", false, "Débito", tableHeader); break;
            case 4: elementCreator("th", false, "Saldo", tableHeader); break;
        }
    };
    for(let i=0;i<rows.length;i++){
        const tr = elementCreator("tr", false, false, table);

        const date = formatDate(rows[i].date)
     
        elementCreator("td", false,date ,tr)
        elementCreator("td", false,`${rows[i].des}` ,tr)
        elementCreator("td", false,`${rows[i].credito}` ,tr)
        elementCreator("td", false,`${rows[i].debito}` ,tr)
        elementCreator("td", false,`${rows[i].saldo}` ,tr)
    }
    return table;
}

//    let tableSelect = document.getElementById("main-table");

function formatDate(date){
    let [dd,mm,yy] = date.split("/");
    if(dd.length===1){
        dd="0" + dd;
    }
    if(mm.length===1){
        mm="0" + mm;
    }
    yy="20" + yy;
    console.log(dd)
    console.log(mm)
    console.log(yy)
    return dd+"/"+mm+"/"+yy;

}