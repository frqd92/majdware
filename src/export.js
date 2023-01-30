import { snapshotArr } from "./arrayTracker";
import * as XLSX from 'xlsx';
export default function exportFunc(){
    const rows = visibleRows();
    const table = document.getElementById("main-table");
    var workbook = XLSX.utils.table_to_book(table);
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




//    let tableSelect = document.getElementById("main-table");