import elementCreator from "../utilities/createDomElement";



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
            case 2: elementCreator("th", ["class", "table-th"], "Designação", tableHeader); break;
            case 3: elementCreator("th", ["class", "table-th"], "Crédito", tableHeader); break;
            case 4: elementCreator("th", ["class", "table-th"], "Débito", tableHeader); break;
            case 5: elementCreator("th", ["class", "table-th"], "Saldo", tableHeader); break;
        }
    };
}        


