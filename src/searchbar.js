export default function searchBarFunc(){
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("focus", ()=>{
        searchBar.placeholder = "";
    });
    searchBar.addEventListener("focusout", ()=>{
        searchBar.placeholder = "Search companies";
    });
    window.addEventListener("keydown", focusInput);
    function focusInput(){
        document.querySelector(".btn-div").addEventListener("click", ()=>{
            window.removeEventListener("keydown", focusInput);
        }, {once:true});
        searchBar.focus();
    }
}

