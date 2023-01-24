export default function searchBarFunc(){
    const searchBar = document.getElementById("search-bar");
    searchBar.focus();
    searchBar.addEventListener("focus", ()=>{
        searchBar.placeholder = "";
    });
    searchBar.addEventListener("focusout", ()=>{
        searchBar.placeholder = "Search companies";
    });


}

