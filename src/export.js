import { snapshotArr, currentFactory } from "./arrayTracker";
import elementCreator from "./utilities/createDomElement";

import * as XLSX from 'sheetjs-style';


export default function exportFunc(){
    const fromDate = visibleRows()[0].date;
    const toDate = visibleRows()[visibleRows().length-1].date;
    const table = exportTable(visibleRows(),[fromDate, toDate]);



    var workbook = XLSX.utils.table_to_book(table,{ dateNF: 'dd-mm-yyyy;@', cellDates: true, raw: true});

    var sheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log(sheet)
    sheet["B1"].s = {									
        font: {
          sz: 40,
          bold: true,
          color: { rgb: "FFFFAA00" }
        },
      };
    XLSX.writeFile(workbook, 'table.xlsx');
}


function visibleRows(){
    let arr = [];
    const rows = document.querySelectorAll(".table-row");
        rows.forEach((elem, index)=>{
            if(!elem.classList.contains("hidden-row")){
                arr.push(snapshotArr[index]);
            }
        })
        return arr
}


function exportTable(rows, dateFilter){
    const table = document.createElement("table");
    const infoRow = elementCreator("tr", false, false, table);
    elementCreator("th", false, `Período: ${dateFilter[0]} > ${dateFilter[1]}`, infoRow)
    elementCreator("th", false, currentFactory, infoRow)

    const tableHeader = elementCreator("tr", false, false, table);
    for(let i=0;i<5;i++){
        switch(i){
            case 0: elementCreator("th", false, "Data",tableHeader); break;
            case 1: elementCreator("th", false, "Designação",tableHeader); break;
            case 2: elementCreator("th", false, "Crédito",tableHeader); break;
            case 3: elementCreator("th", false, "Débito",tableHeader); break;
            case 4: elementCreator("th", false, "Saldo €",tableHeader); break;
        }
    };
    for(let i=0;i<rows.length;i++){
        const tr = elementCreator("tr", false, false, table);
        const date = formatDate(rows[i].date);
        elementCreator("td", false,date,tr)
        elementCreator("td", false,`${rows[i].des}` ,tr)
        elementCreator("td", false,`${rows[i].credito}` ,tr)
        elementCreator("td", false,`${rows[i].debito}` ,tr)
        elementCreator("td", false,`${rows[i].saldo}` ,tr)
    }
    return table;
}

//    let tableSelect = document.getElementById("main-table");


function informationTable(){

}







function formatDate(date){
    let [dd,mm,yy] = date.split("/");
    if(dd.length===1){
        dd="0" + dd;
    }
    if(mm.length===1){
        mm="0" + mm;
    }
    yy="20" + yy;
    return dd+"/"+mm+"/"+yy;
}