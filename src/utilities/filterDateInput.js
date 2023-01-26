import arrowImg from '/src/Assets/arrow-other.png';
import elementCreator from './createDomElement';
export default function filterDate(div){
    elementCreator("p", ["class", "filter-text"], "Date Range ", div);
    const miniInputDiv = elementCreator("div", ["class", "mini-inputs-div"], false, div);

    for(let i=0;i<6;i++){
        let input;
        if(i<3){
            input = elementCreator("input", ["class", "mini-input", "mini-input-left"], false, miniInputDiv);
        }
        else{
             input = elementCreator("input", ["class", "mini-input", "mini-input-right"], false, miniInputDiv);
        }
        if(i!==5){
            if(i!==2){
                elementCreator("span", ["class", "mini-input-slash"], "/", miniInputDiv);
            }
            else{
                const arrowDiv = elementCreator("span", ["class", "mini-input-arrow"], false, miniInputDiv);
                const arrow = document.createElement("img");
                arrow.src= arrowImg;
                arrowDiv.appendChild(arrow);
            }
        }
        switch(i){
            case 0:
            case 3:
                input.placeholder = "dd";
                break;
            case 1:
            case 4:
                input.placeholder = "mm";
                break;
            case 2:
            case 5:
                input.placeholder = "yy";
                break;

        }
    }
    dateInputLogic();
}

function dateInputLogic(){
    const allInputs = document.querySelectorAll(".mini-input");
    const leftInputs = document.querySelectorAll(".mini-input-left");
    const rightInputs = document.querySelectorAll(".mini-input-right");
    
    allInputs.forEach((elem, index)=>{   
        elem.addEventListener("input",(e)=>{
            // console.log(checkIfValid())

            if(isNaN(e.data) || elem.value.length>2){
                elem.value = elem.value.substring(0, elem.length-1);
            }
            if(e.inputType === "deleteContentBackward"){
                elem.value="";
            }
            if(elem.value.length===2 && index!==5){
                elem.nextSibling.nextSibling.focus();
            }
            if(elem.value.length === 2 && checkIfValid()){
                
            }
        });
    });

    function checkIfValid(){
        let total=0;
        allInputs.forEach((elem, index)=>{
            total+=elem.value.length;
            if(index===0 || index === 3){
                if(elem.value>31){
                    
                    elem.value="";
                }

            }
            if(index===1 || index === 4){
                if(elem.value>12){
                    elem.value="";
                }
            }
            
        })
        if(total<12){
            return false;
        }

      return false;
    }

    window.addEventListener("keydown", resetDate);

    function resetDate(e){
        
        if(e.key==="Delete"){
            if(document.querySelector(".mini-input")!==null){
                document.querySelectorAll(".mini-input").forEach(elem=>{
                    elem.value ="";
                })

                document.getElementById("factory-back-btn").addEventListener("click", ()=>{
                    window.removeEventListener("keydown", resetDate);
                }, {once:true});
            }
        }

    }



}




