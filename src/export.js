import { snapshotArr, currentFactory } from "./arrayTracker";
import elementCreator from "./utilities/createDomElement";
import * as XLSX from 'sheetjs-style';
import "/src/styles/table.css"
import rmvFor from "./utilities/formatNum";
import numeral from "numeral";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import pdfImg from '/src/Assets/pdf.png'
import exlImg from '/src/Assets/excel.png'

export function exportBtnEvents(btn){
    window.addEventListener("keydown", checkKey);
    btn.addEventListener("click", generatePdf);
    function checkKey(e){
        if(e.code==="ShiftLeft" || e.code==="ShiftRight"){
            btn.removeEventListener("click", generatePdf);
            btn.addEventListener("mouseup", exportModal);
        }
        window.addEventListener("keyup", ()=>{
            btn.removeEventListener("mouseup", exportModal);
            btn.addEventListener("click", generatePdf);
        }, {once:true})
        document.getElementById("factory-back-btn").addEventListener("click", ()=>{
            window.removeEventListener("keydown", checkKey);
        })
    }
}


function exportModal(){
    const modal = elementCreator("div", ["class", "export-modal"], false, document.body);
    const closeBtn = elementCreator("button", ["class", "export-modal-close"], "X", modal)
    const fact = elementCreator("div", ["class","export-modal-fact-div"], false, modal);
    elementCreator("p", ["class","export-modal-text"], "Modify name", fact);
    const factInput =elementCreator("input", ["class","export-modal-fact-input"],false, fact);
    factInput.value = currentFactory;
    
    const exportTypeDiv = elementCreator("div", ["class", "export-modal-type-div"], false, modal);
    elementCreator("p", ["class", "export-modal-text"], "Export as", exportTypeDiv);
    const btnDiv = elementCreator("div", ["class", "modal-btn-div"], false,exportTypeDiv )
    const pdf = document.createElement("img");
    const exl = document.createElement("img");
    pdf.src=pdfImg;
    exl.src=exlImg;
    pdf.classList.add("export-modal-pdf");
    exl.classList.add("export-modal-exl");
    btnDiv.appendChild(pdf);
    btnDiv.appendChild(exl);
    pdf.addEventListener("click", (e)=>{
        const factName = document.querySelector(".export-modal-fact-input").value;
        generatePdf(e, factName);
    });
    exl.addEventListener("click", (e)=>{
        const factName = document.querySelector(".export-modal-fact-input").value;
        generateExcel(e, factName);
    });

    closeBtn.addEventListener("click", ()=>{
        modal.remove();
    })
    window.addEventListener("keydown", removeModal);
    function removeModal(e){
        if(e.code==="Escape"){
            window.removeEventListener("keydown", removeModal);
            modal.remove();
        }
    }

}



function generatePdf(e, factName){
    const fromDate = visibleRows()[0].date;
    const toDate = visibleRows()[visibleRows().length-1].date;
    const table = exportTable(visibleRows());
    const info = infoTable([fromDate, toDate], factName)
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
            1 : {halign: "center"}
        },
    })

      doc.save(`${currentFactory}-${fromDate}-${toDate}.pdf`);
      table.remove();
      info.remove()
  }



function exportTable(rows, date, factName){

    const table = document.createElement("table");
    table.id = "export-table";
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
    const tbody = elementCreator("tbody", false, false, table);
    for(let i=0;i<rows.length;i++){
        const tr = elementCreator("tr", false, false, tbody);
        const date = formatDate(rows[i].date);
        elementCreator("td", false,date,tr)
        elementCreator("td", false,`${rows[i].des}` ,tr)
        elementCreator("td", false,`${rows[i].credito}` ,tr)
        elementCreator("td", false,`${rows[i].debito}` ,tr)
        elementCreator("td", false,`${rows[i].saldo}` ,tr)
    }


    const tfoot = elementCreator("tfoot", false, false , table );
    const tfootRow = elementCreator("tr", false ,false, tfoot);
    const scope = elementCreator("th", false, "Total", tfootRow);
    scope.setAttribute("scope", "row");
    const [totalCredit, totalDebit, totalSaldo] = calculateTotals(rows);

    elementCreator("th", false, "", tfootRow);
    elementCreator("th", false, `${totalCredit}€`, tfootRow);
    elementCreator("th", false, `${totalDebit}€`, tfootRow);
    elementCreator("th", false, `${totalSaldo}€`, tfootRow);

    return table;
}

export default function generateExcel(e, factName){
    const fromDate = visibleRows()[0].date;
    const toDate = visibleRows()[visibleRows().length-1].date;
    const table = exportTable(visibleRows(),[fromDate, toDate], factName);
    let infoHeader = infoTable([fromDate,toDate], factName);

    infoHeader = infoHeader.outerHTML.replace(`<table id="export-info-table">`, "").replace(`</table>`, "");
    table.innerHTML += infoHeader;
    console.log(table)
    
    var workbook = XLSX.utils.table_to_book(table,{ dateNF: 'dd-mm-yyyy;@', cellDates: true, raw: true});

    XLSX.writeFile(workbook, `${currentFactory}-${fromDate}-${toDate}.xlsx`);
}


function infoTable(dateFilter, factName){
    let fact = currentFactory;
    if(factName){fact = factName;}
    const table = document.createElement("table");
    table.id = "export-info-table";
    const headtr = elementCreator("tr", false, false, table )
    elementCreator("td", false, "Extracto de Contas Correntes", headtr);
    const tbody =  elementCreator("tbody", false, false, table);
    const tr =  elementCreator("tr", false, false, tbody);
    elementCreator("td", false, fact, tr);
    const tr2 =  elementCreator("tr", false, false, tbody);
    elementCreator("td", false, `${dateFilter[0]} > ${dateFilter[1]}`, tr2);
    return table
}


















function calculateTotals(rows){
    let totalCredit=0, totalDebit=0;
    rows.forEach(elem=>{
        totalCredit+= rmvFor(elem.credito);
        totalDebit+= rmvFor(elem.debito)
    })
    let totalSaldo = rmvFor(rows[rows.length-1].saldo);

    return [numeral(totalCredit).format('0,0'), numeral(totalDebit).format('0,0'), numeral(totalSaldo).format('0,0')];
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

