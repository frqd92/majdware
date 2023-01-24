
import elementCreator from "./utilities/createDomElement";
import '/src/styles/companyList.css';

let companyArr = [];
export function companyData(name){
    companyArr.push(name);
}

export default function updateCompanyList(){
    const div = document.querySelector(".list-companies");
    if(div.querySelector(".empty-company")!==null){
        div.querySelector(".empty-company").remove()
    }
    companyArr.forEach((elem, index)=>{
        elementCreator("div", ["class", ["company-row"]], `${companyArr[index]}`, div);
    })
    companyArr = [];
}