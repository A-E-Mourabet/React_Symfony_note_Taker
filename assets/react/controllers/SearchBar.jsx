import React from "react";

import { useState } from "react";

export function SearchBar({notes ,visibleNotes, setVisibleNotes}){
    const [ searched , setSearched] = useState("")

function SearchDefault(){
    setSearched("");
    searchHandler(""); 
}

function SearchBarChange(e){
    e.preventDefault();
    const searchText = e.target.value;
    setSearched(searchText);
    searchHandler(searchText);
}

function searchHandler(search){
    if(search==="") {(setVisibleNotes(notes));}
    else{
        setVisibleNotes(notes);
        setVisibleNotes(currentNotes =>{
        return currentNotes.filter(notes => (notes.content.includes(search)||notes.title.includes(search)) )
    });}
    console.log(search);

}


return(
<div className="searchBarWrap">
    <label className="searchBarLabel">Search : </label>
        <input type="text" className="searchBar" onChange={SearchBarChange} value={searched}/>
        <button type="reset" className="resetButton" onClick={SearchDefault}>Clear</button>

      </div>


);
}