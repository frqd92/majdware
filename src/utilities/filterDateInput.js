import arrowImg from '/src/Assets/arrow-other.png';
import elementCreator from './createDomElement';
export default function filterDate(div){
    elementCreator("p", ["class", "filter-text"], "Date Range ", div);
    const miniInputDiv = elementCreator("div", ["class", "mini-inputs-div"], false, div);

    for(let i=0;i<6;i++){
        let input;
        if(i<3){
            input = elementCreator("input", ["class", "mini-input", "mini-input-left", "date-filter"], false, miniInputDiv);
        }
        else{
             input = elementCreator("input", ["class", "mini-input", "mini-input-right", "date-filter"], false, miniInputDiv);
        }
        if(i!==5){
            if(i!==2){
                elementCreator("span", ["class", "mini-input-slash", "date-filter"], "/", miniInputDiv);
            }
            else{
                const arrowDiv = elementCreator("span", ["class", "mini-input-arrow", "date-filter"], false, miniInputDiv);
                const arrow = document.createElement("img");
                arrow.src= arrowImg;
                arrowDiv.appendChild(arrow);
            }
        }
        switch(i){
            case 0:
            case 3:
                input.placeholder = "dd";
                checkForZero();
                break;
            case 1:
            case 4:
                input.placeholder = "mm";
                checkForZero();
                break;
            case 2:
            case 5:
                input.placeholder = "yy";
                break;

        }
    }
    dateInputLogic();
}


function checkForZero(){
    const miniInput = document.querySelectorAll(".mini-input");
    miniInput.forEach((elem, i)=>{
        elem.addEventListener("keydown", (e)=>{
            if(e.key==="ArrowRight" || e.key==="ArrowLeft" || e.key==="Enter"){
                if(i===0 || i=== 1 || i===3 || i===4){
                    if(elem.value.length===1){
                        elem.value = "0" +elem.value;
                    }
                }
                if(i===2 || i===5){
                    if(elem.value.length===1){
                        elem.value="";
                    }
                }
            }
            if(e.key === "ArrowRight" && i!==5){
                document.querySelectorAll(".mini-input")[i+1].focus();
            }

            else if(e.key ==="ArrowLeft" && i!==0){
                document.querySelectorAll(".mini-input")[i-1].focus();
            }
        })
    })
}







function dateInputLogic(){
    const allInputs = document.querySelectorAll(".mini-input");
    allInputs.forEach((elem, index)=>{   
        elem.addEventListener("input",(e)=>{
            isInputValid();
            if(e.inputType === "deleteContentBackward"){
                validBackground(false);
                elem.value="";
                if(index!==0){
                    elem.previousSibling.previousSibling.focus();
                }
            }
            if( isNaN(e.data)|| elem.value.length>2){
                elem.value = elem.value.substring(0, elem.length-1);
            }

            if(elem.value.length===2){ //put here logic to search movimentos
                if(index!==5){
                    elem.nextSibling.nextSibling.focus();
                }
                if(isInputValid()){
                    validBackground(true);
                }
                else{
                    validBackground(false);
                }
            }      
        });
    });

    function validBackground(boo){
        const allInputElem = document.querySelectorAll(".date-filter");
        if(boo){
            allInputElem.forEach(elem=>{
                elem.classList.add("valid-input-bg");
            });
        }
        else{
            allInputElem.forEach(elem=>{
                elem.classList.remove("valid-input-bg");
            })
        }

    }



    function isInputValid(){
        let total=0;
        allInputs.forEach((elem, index)=>{
            total+=elem.value.length;
            if(index===0 || index === 3){
                if(elem.value>31){
                    elem.value="";
                    elem.focus()
                }
            }
            if(index===1 || index === 4){
                if(elem.value>12){
                    elem.value="";
                    elem.focus()
                }
            }
        })
        if(total>11){
            return true;
        }
        else{
            return false;
        }
    }

    window.addEventListener("keydown", resetDate);

    function resetDate(e){
        
        if(e.key==="Delete"){
            if(document.querySelector(".mini-input")!==null){
                document.querySelectorAll(".mini-input").forEach(elem=>{
                    elem.value ="";
                })
                validBackground(false);
                document.getElementById("factory-back-btn").addEventListener("click", ()=>{
                    window.removeEventListener("keydown", resetDate);
                }, {once:true});
            }
        }

    }



}




