export function filterTable(dateArr){
    const [fromDate, toDate] = removeZeros(dateArr);
    const tdDates = document.querySelectorAll(".td-date");
    let allDates = [];
    tdDates.forEach(elem=>{
        allDates.push(elem.innerText.split("/"));
    })
    let toDates = removeZeros(allDates);

    for(let index = 0; index<tdDates.length;index++){
        const [dd,mm,yy] = toDates[index];
        if(Number(yy) < Number(fromDate[2]) || Number(yy) > Number(toDate[2])){
            tdDates[index].parentElement.classList.add("hidden-row");
        }
        if(Number(yy) === Number(fromDate[2])){
            if(Number(mm)<Number(fromDate[1])){
                tdDates[index].parentElement.classList.add("hidden-row");
            }
            if(Number(mm)=== Number(fromDate[1])){
                if(Number(dd)<Number(fromDate[0])){
                    tdDates[index].parentElement.classList.add("hidden-row");
                }
            }
        }
        if(Number(yy) === Number(toDate[2])){
            if(Number(mm)>Number(toDate[1])){
                tdDates[index].parentElement.classList.add("hidden-row");
            }
            if(Number(mm) === Number(toDate[1])){
                if(Number(dd)>Number(toDate[0])){
                    tdDates[index].parentElement.classList.add("hidden-row");
                }
            }

        }
    }
}


export function defilterTable(){
    let allRows = document.querySelectorAll(".table-row");
    allRows.forEach(elem=> elem.classList.remove("hidden-row"));
};

function removeZeros(arr){
    arr.forEach(elem=>{
        for(let i=0;i<3;i++){
            if(Number(elem[i][0])===0){
                elem[i] = elem[i].replace("0", "");
            }
        }
    })
    return arr;
}