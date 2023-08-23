import React from "react";
import axios from 'axios';




export function DeleteButtons({visibleNotes , notes , setNotes, showCloseButtons, setShowCloseButtons,setVisibleNotes}){

    function toggleVis(){
        setShowCloseButtons((prev) => !prev);
    }

    function deleteNote(){
        toggleVis();
        var deletableNotes = notes.filter( (note) => note.checked);
        setNotes(notes.filter( (note) => !note.checked));
        setVisibleNotes(visibleNotes.filter( (note) => !note.checked));
        axios.delete('/deleteNotes',{
          data : {delNotes:deletableNotes},
        }).then(response => {
          console.log(response.data.message);
        })
        .catch(error => {
          console.error('Error deleting notes:', error);
        });
    }
    return(
        <div className="buttonWrap">     
          <button
            className={showCloseButtons?"showDel big" :"showDel "}
            on onClick={
              toggleVis
            } 
            value={showCloseButtons ? "Hide Close Buttons" : "Show Close Buttons"} 
            >
             <span className= {showCloseButtons?"ConfirmDelete hidden" :"ConfirmDelete "}>Hide X </span>
          <svg className={showCloseButtons?"bin hidden" :"bin "} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          </button>
          <button 
            className={showCloseButtons ? "deleter" : "deleter hidden"} 
            on onClick={()=>deleteNote()} 
            value="delete" 
            >
            <svg className="bin" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            </button>
            
          </div>
    );
}