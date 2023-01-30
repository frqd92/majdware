export function filterTable(dateArr){
    const [fromDate, toDate] = removeZeros(dateArr);
    console.log("from: ", fromDate);
    console.log("to: ", toDate);
    const tdDates = document.querySelectorAll(".td-date");
    let allDates = [];
    tdDates.forEach(elem=>{
        allDates.push(elem.innerText.split("/"));
    })
    let toDates = removeZeros(allDates);

    for(let index = 0; index<tdDates.length;index++){
        const [,,yy] = toDates[index];
        if(yy < fromDate[2] || yy > toDate[2]){
            tdDates[index].parentElement.classList.add("hidden-row");
        };
    }

    for(let index = 0; index<tdDates.length;index++){
        const [,mm,yy] = toDates[index];
        if(!tdDates[index].parentElement.classList.contains("hidden-row")){
            if(yy===fromDate[2] && mm<fromDate[1]){
                tdDates[index].parentElement.classList.add("hidden-row");
            }
            if(yy===toDate[2] && mm> toDate[1]){
                tdDates[index].parentElement.classList.add("hidden-row");
            }
        }
    }
    for(let index = 0; index<tdDates.length;index++){
        const [dd,mm,yy] = toDates[index];
        if(!tdDates[index].parentElement.classList.contains("hidden-row")){
            if(mm===fromDate[1] && dd<fromDate[0]){
                tdDates[index].parentElement.classList.add("hidden-row");
            }
            if(mm===toDate[1] && dd> toDate[0]){
                tdDates[index].parentElement.classList.add("hidden-row");
            }
        }

    }


}

/*
            console.log(mm)
            console.log(yy)
            console.log("---");
            console.log(fromDate[1])
            console.log(toDate[1])
            console.log("---");

*/






export function defilterTable(){
    const tdDates = document.querySelectorAll(".td-date");
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