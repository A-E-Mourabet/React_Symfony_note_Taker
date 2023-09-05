import React, { useState } from 'react';
import { SearchBar } from "./SearchBar";
import AddNote from "./AddNote";
import "../../styles/AppStyle.scss";
import axios from 'axios';
import Note from './Note';
import ListedNote from './ListedNote';

export default function App(){
  // useStates:
  const [darkMode, setDarkMode] = useState(false);
  const [listMode, setListMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [notes,setNotes]=useState([]);
  const [visibleNotes,setVisibleNotes]=useState([]);
  const [userId, setUserId] = useState(null);;
  const [creationDate, setCreationDate] = useState(new Date());

  //functions
  function delNote(id){ 
    const deletableNotes = notes.filter( (note) => note.id===id);
    setNotes([...notes.filter( (note) => note.id!==id)]);
    setVisibleNotes([...visibleNotes.filter( (note) => note.id!==id)]);

    axios.delete('/deleteNotes',{
        data : {delNotes:deletableNotes},
      }).then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error deleting notes:', error);
      });
  }

  function changeBodyBGColor(){
    setDarkMode(
      (previousDarkMode) => !previousDarkMode
    );
    document.body.style.backgroundColor = darkMode ? "#FFFFFF" : "#050B41 " ;
  }

  function changeDisplayMode(){
    setListMode(
      (previousListMode) => !previousListMode
    );

  }


 // returned HTML
  return(
  <>
  <div className="logout_wrap"><a className='save' href="/logout">logout &#8614; </a>
  <button
				onClick={() =>
					changeBodyBGColor()   
				}
				className='save'
			>
				dark light
			</button>
      <button
				onClick={() =>
					changeDisplayMode()   
				}
				className='save'
			>
				change display mode
			</button>
      </div>
  <p className="ListTitle" style={{ color: darkMode ? "#FFFFFF" : "#000000" }} >React ~ Notes</p>
  <hr className="line"></hr>

  <SearchBar notes={notes} visibleNotes={visibleNotes} setVisibleNotes={setVisibleNotes} />

  <h1 className="header" style={{ color: darkMode ? "#FFFFFF" : "#000000" }}>Notes...</h1>
        
    <div className={`NoteList ${listMode ? 'listMode' : 'gridMode'}`}>

    <AddNote setNotes={setNotes} setVisibleNotes={setVisibleNotes} userId={userId} setUserId={setUserId} notes={notes} visibleNotes={visibleNotes} creationDate={creationDate} setCreationDate={setCreationDate} /> 
        {visibleNotes.map((note) =>{
            return( <div key={note.id}>
              {listMode ?(
                <ListedNote Note listMode={listMode} id= {note.id} title={note.title} content={note.content} date={note.Cdate} handleDeleteNote={delNote} setCreationDate={setCreationDate}  />
                ) : (
                <Note listMode={listMode} id= {note.id} title={note.title} content={note.content} date={note.Cdate} handleDeleteNote={delNote} setCreationDate={setCreationDate}  />  

                )}


            </div>
         )
         })} 
        </div>
        <div className='showSelectedNote'>

        </div>
        </>
    )};