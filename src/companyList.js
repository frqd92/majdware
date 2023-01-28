import { writeCompanies } from ".";
import { makeFactoryPage } from "./company pages/makeFactory";
let companyArr = [];
let saveArray = [];
import elementCreator from "./utilities/createDomElement";
import { mainArray } from "./arrayTracker";


export function companyData(name){
    companyArr.push(name);
}
//makes actual row
export default function updateCompanyList(){
    const div = document.querySelector(".list-companies");
    if(div.querySelector(".empty-company")!==null){
        div.querySelector(".empty-company").remove()
    };

    companyArr.forEach((elem, index)=>{
        const row = elementCreator("div", ["class", ["company-row"]], `${companyArr[index]}`, div);
        row.addEventListener("click", makeFactoryPage);
        
        saveArray.push({factoryName:elem})
    })
        writeCompanies(saveArray);
    
    companyArr = [];
}


export function feedCompanies(arr){
    if(document.querySelector(".empty-company")!==null && arr){
        document.querySelector(".empty-company").remove()
    }
    for(let i=0;i<arr.length;i++){
        companyArr.push(arr[i].factoryName);
    }
    updateCompanyList();
};

