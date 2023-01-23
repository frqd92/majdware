export default function searchBarFunc(){
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("focus", ()=>{
        searchBar.placeholder = "";
    });
    searchBar.addEventListener("focusout", ()=>{
        searchBar.placeholder = "Search companies";
    });
    function searchFunc(){
        
    }
}

