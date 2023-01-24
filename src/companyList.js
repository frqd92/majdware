import { companyData } from "./mainArray";
import { companyArr } from "./mainArray";
import elementCreator from "./utilities/createDomElement";
import '/src/styles/companyList.css'
export default function updateCompanyList(){
    const div = document.querySelector(".list-companies");
    companyArr.forEach((elem, index)=>{
        const row = elementCreator("div", ["class", ["company-row"]], `${companyArr[index]}`, div);
    })
}