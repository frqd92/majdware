import elementCreator from "../utilities/createDomElement";
import { desigArray } from "../arrayTracker";


import '/src/styles/table.css'
export function generateTable(div){
    const table = elementCreator("table", ["id", "main-table"], false, div);
    const tableHeader = elementCreator("tr", ["class", "table-header"], false, table);

    for(let i=0;i<6;i++){
        switch(i){
            case 0: 
            const num = elementCreator("th", ["class", "table-th"], "Nº", tableHeader); 
            num.setAttribute("data-visible", false);
            break;
            case 1: elementCreator("th", ["class", "table-th"], "Data", tableHeader); break;
            case 2: desigHeader(tableHeader); break;
            case 3: elementCreator("th", ["class", "table-th"], "Crédito", tableHeader); break;
            case 4: elementCreator("th", ["class", "table-th"], "Débito", tableHeader); break;
            case 5: elementCreator("th", ["class", "table-th"], "Saldo", tableHeader); break;
        }
    };
}        


function desigHeader(parent){
    const div = elementCreator("th", ["class", "table-th", "th-desig"], false, parent); 
    const text = elementCreator("p", false, "Designação", div);
    const arrow = elementCreator("span", false, "<", div)
    const clearFilterText = elementCreator("div", ["class", "clear-filter-text"], "مسح عامل تصفية", div)
    div.addEventListener("click", showDesigs);

    function showDesigs(e){
        if(!this.className.includes("td-desig-on")){
            document.querySelector(".clear-filter-text").classList.remove("clear-filter-text-show")
            clearFilter()
            if(desigArray.length<1){
                alert("ليس لديك أي رموز");
                return;
            }
            this.classList.add("td-desig-on");
            arrow.classList.add("td-arrow-on");
            createMenu();
            window.addEventListener("click", closeDesig);
        }
        else{
            if(e.target.closest(".table-desig-menu")) return;
            filterTextFunc()
            this.classList.remove("td-desig-on");
            arrow.classList.remove("td-arrow-on");
            document.querySelector(".table-desig-menu").remove();
            window.removeEventListener("click", closeDesig);
        }

        function closeDesig(e){
            if(!e.target.closest(".th-desig")){
                filterTextFunc()
                div.classList.remove("td-desig-on");
                arrow.classList.remove("td-arrow-on");
                if(document.querySelector(".table-desig-menu")!==null){
                    document.querySelector(".table-desig-menu").remove()
                }
            window.removeEventListener("click", closeDesig);
            }
        } 
        function filterTextFunc(){
            const allTableRows = document.querySelectorAll(".table-row");
            let isFilterOn = false;
            allTableRows.forEach(row=>{
                if(row.className.includes("hidden-row-desig")){
                    isFilterOn = true;
                }
            })
            const text = document.querySelector(".clear-filter-text");
            if(isFilterOn){
                text.classList.add("clear-filter-text-show");
                window.addEventListener("keydown", clearFilterWindow);
            }
            else{
                text.classList.remove("clear-filter-text-show");
                window.removeEventListener("keydown", clearFilterWindow);
                
            }
        }
        function clearFilterWindow(e){
            if(e.key==="Escape"){
                clearFilter();
                document.querySelector(".clear-filter-text").classList.remove("clear-filter-text-show")
                window.removeEventListener("keydown", clearFilterWindow);

            }
        }
        function clearFilter(){
            const allTableRows = document.querySelectorAll(".table-row");
            allTableRows.forEach(row=>{
                row.classList.remove("hidden-row-desig")
            })
        }



    }

    function createMenu(){
        if(document.querySelector(".table-desig-menu")===null){
            const menuDiv = elementCreator("div", ["class", "table-desig-menu"], false, div);
            desigArray.forEach(desig=>{
                const row = MenuFact(desig.code, desig.desigName);
                menuDiv.appendChild(row);
            })
        }

    }

    function MenuFact(code, name){
        const menuFactDiv = elementCreator("div", ["class", "td-desig-row"], false, false);
        const text = elementCreator("div", ["class", "td-desig-text"], code + " " + name, menuFactDiv);
        const check = elementCreator("span", ["class", "td-desig-check"], "✓", menuFactDiv);
        
        menuFactDiv.addEventListener("click", selectDesig);

        function selectDesig(){
            if(!this.className.includes("td-desig-row-selected")){
                this.classList.add("td-desig-row-selected");
                check.classList.add("td-check-show");
            }
            else{
                this.classList.remove("td-desig-row-selected");
                check.classList.remove("td-check-show");
            }
            filterTableItems();
        }
        function filterTableItems(){
            const allDesig = document.querySelectorAll(".td-desig-row");
            const allTableRows = document.querySelectorAll(".table-row");

            const selectedCodes = [];
            allDesig.forEach(desig=>{
                const menuCode = Number(desig.querySelector(".td-desig-text").innerText.split("").shift());
                const isChecked = desig.className.includes("td-desig-row-selected");
                if(isChecked) selectedCodes.push(menuCode);
      
            })
            allTableRows.forEach(row=>{
                const desig = Number(row.querySelector(".td-desig").innerText.split("").shift())
                if(!selectedCodes.includes(desig)){
                    row.classList.add("hidden-row-desig")
                }
                else{
                    row.classList.remove("hidden-row-desig")
                }
                if(selectedCodes.length===0){
                    row.classList.remove("hidden-row-desig")

                }
            })
        }
        
        
        
        
        return menuFactDiv;
    }


}