import React from "react";
import { useState } from "react";
import { MdSearch } from 'react-icons/md';

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
        <MdSearch className='search-icons' size='1.3em' />
        <input type="text" className="searchBar" onChange={SearchBarChange} value={searched} placeholder="type to search in notes...."/>
        <button type="reset" className="resetButton" onClick={SearchDefault}>Clear</button>

      </div>


);
}