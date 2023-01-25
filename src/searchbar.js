export default function searchBarFunc(){
    const searchBar = document.getElementById("search-bar");
    searchBar.focus();





    searchBar.addEventListener("input", searchFactories)

    searchBar.addEventListener("focus", ()=>{
        searchBar.placeholder = "";
    });
    searchBar.addEventListener("focusout", ()=>{
        searchBar.placeholder = "Search companies";
    });
    searchBar.addEventListener("keydown", (e)=>{
        if(e.key==="Delete"){
            searchBar.value="";
            document.querySelectorAll(".company-row").forEach((elem)=>{
                elem.style.display="flex";
            })
        }
    });

    
}

export function searchFactories(){
    const allFactories = document.querySelectorAll(".company-row");
    const searchBar = document.getElementById("search-bar");
    allFactories.forEach((elem)=>{
        const row = elem.innerText.toLowerCase().replace(/\s/g, '');
        if(!row.includes(searchBar.value.replace(/\s/g, '').toLowerCase())){
            elem.style.display="none";
        }
        else{
            elem.style.display="flex";
        }
    })

}
