import { snapshotArr, currentFactory } from "./arrayTracker";
import elementCreator from "./utilities/createDomElement";
import * as XLSX from 'sheetjs-style';
import "/src/styles/table.css"

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function generate() {
    const fromDate = visibleRows()[0].date;
    const toDate = visibleRows()[visibleRows().length-1].date;
    const table = exportTable(visibleRows());
    const info = infoTable([fromDate, toDate])
    console.log(info)
    document.body.appendChild(info);
    document.body.appendChild(table);
    const doc = new jsPDF()

    autoTable(doc, { 
        html : '#export-info-table',
        columnStyles: { 
            0: { halign: 'center' } ,
            1: { halign: "center"}
        },
        theme: "grid",
        margin: { top: 10 },
    })
    autoTable(doc, { 
        html: '#export-table',
        styles: {
            halign:"center"
        },
        columnStyles: {
            1 : {halign: "justify"}
        }
        
    })

    // autoTable(doc, {
    //     head: [['Name', 'Email', 'Country']],
    //     body: [
    //       ['David', 'david@example.com', 'Sweden'],
    //       ['Castille', 'castille@example.com', 'Spain'],
    //       // ...
    //     ],
    //   })
      
      doc.save('table.pdf');
      table.remove();
      info.remove()
  }


function infoTable(dateFilter){
    const table = document.createElement("table");
    table.id = "export-info-table";
    elementCreator("caption", false, "Extracto de Contas Correntes", table);
    const tbody =  elementCreator("tbody", false, false, table);
    const tr =  elementCreator("tr", false, false, tbody);
    elementCreator("th", false, currentFactory, tr);
    elementCreator("th", false, `${dateFilter[0]} > ${dateFilter[1]}`, tr);
    return table
}

function exportTable(rows){
    const table = document.createElement("table");
    table.id = "export-table";
    // const infoRow = elementCreator("tr", false, false, table);
    // elementCreator("th", false, `Período: ${dateFilter[0]} > ${dateFilter[1]}`, infoRow)
    // elementCreator("th", false, currentFactory, infoRow)
    const thead = elementCreator("thead", false, false, table)
    const tableHeader = elementCreator("tr", false, false, thead);
    for(let i=0;i<5;i++){
        switch(i){
            case 0: elementCreator("th", false, "Data",tableHeader); break;
            case 1: elementCreator("th", false, "Designação",tableHeader); break;
            case 2: elementCreator("th", false, "Crédito",tableHeader); break;
            case 3: elementCreator("th", false, "Débito",tableHeader); break;
            case 4: elementCreator("th", false, "Saldo €",tableHeader); break;
        }
    };
    const tbody = elementCreator("tbody", false, false, table)
    for(let i=0;i<rows.length;i++){
        const tr = elementCreator("tr", false, false, tbody);
        const date = formatDate(rows[i].date);
        elementCreator("td", false,date,tr)
        elementCreator("td", false,`${rows[i].des}` ,tr)
        elementCreator("td", false,`${rows[i].credito}` ,tr)
        elementCreator("td", false,`${rows[i].debito}` ,tr)
        elementCreator("td", false,`${rows[i].saldo}` ,tr)
    }
    return table;
}



















// export default function exportFunc(){
//     const fromDate = visibleRows()[0].date;
//     const toDate = visibleRows()[visibleRows().length-1].date;
//     const table = exportTable(visibleRows(),[fromDate, toDate]);


//     var workbook = XLSX.utils.table_to_book(table,{ dateNF: 'dd-mm-yyyy;@', cellDates: true, raw: true});

//     var sheet = workbook.Sheets[workbook.SheetNames[0]];
//     // styleTable(sheet);
//     console.log(sheet)
//     XLSX.writeFile(workbook, 'table.xlsx');


//     var range = XLSX.utils.decode_range(sheet['!ref']);
//     for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
//     // Example: Get second cell in each row, i.e. Column "B"
//     const firstCol = sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})];
//     const secondCol = sheet[XLSX.utils.encode_cell({r: rowNum, c: 1})];
//     // NOTE: secondCell is undefined if it does not exist (i.e. if its empty)
//     console.log(firstCol); // secondCell.v contains the value, i.e. string or number
// }
// }



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

function styleTable(sheet){
    console.log(sheet)

    sheet["B1"].s = {									
        font: {
          sz: 40,
          bold: true,
          color: { rgb: "FFFFAA00" }
        },
      };
      sheet["C2"].s = {									
        font: {
          sz: 60,
          bold: true,
          color: { rgb: "748D69" }
        },
      };





    // for (const [key, value] of Object.entries(sheet)) {
    //         //   console.log(`${key}: ${value}`);
    //     for(const val of Object.entries(value)){
    //         console.log(val);
    //     }
    //   }
      

}
