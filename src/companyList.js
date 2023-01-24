import { writeCompanies } from ".";
let companyArr = [];
let saveArray = [];
import elementCreator from "./utilities/createDomElement";
export function companyData(name){
    companyArr.push(name);

}

export default function updateCompanyList(){
    const div = document.querySelector(".list-companies");
    if(div.querySelector(".empty-company")!==null){
        div.querySelector(".empty-company").remove()
    };

    companyArr.forEach((elem, index)=>{
        elementCreator("div", ["class", ["company-row"]], `${companyArr[index]}`, div);
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
    updateCompanyList()
}