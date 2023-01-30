export function filterTable(dateArr){
    const [fromDate, toDate] = dateArr;
    const tdDates = document.querySelectorAll(".td-date");
    let dateArray = [];
    tdDates.forEach(elem=>{
        let toArray = elem.innerText.split("/")
        //year
        if(toArray[2] < fromDate[2] || toArray[2] > fromDate[2]){
            elem.parentElement.classList.add("hidden-row")
        }

    })
}
export function defilterTable(){
    console.log("farshit")
    const tdDates = document.querySelectorAll(".td-date");
    let allRows = document.querySelectorAll(".table-row");
    allRows.forEach(elem=> elem.classList.remove("hidden-row"));
};