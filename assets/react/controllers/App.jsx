import React, { useState } from 'react';
import { SearchBar } from "./SearchBar";
import AddNote from "./AddNote";
import "../../styles/AppStyle.scss";
import axios from 'axios';
import Note from './Note';

export default function App(){
  // useStates:
  const [darkMode, setDarkMode] = useState(false);
  const [notes,setNotes]=useState([]);
  const [visibleNotes,setVisibleNotes]=useState([]);
  const [userId, setUserId] = useState(null);;
  const [creationDate, setCreationDate] = useState(new Date());

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
 // returned HTML
  return(
  <>
  		<div className={`${darkMode && 'dark-mode'}`}>
  <div className="logout_wrap"><a className='save' href="/logout">logout &#8614; </a>
  <button
				onClick={() =>
					setDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			>
				Toggle Mode
			</button>
      </div>
  <p className="ListTitle">React ~ Notes</p>
  <hr className="line"></hr>

  <SearchBar notes={notes} visibleNotes={visibleNotes} setVisibleNotes={setVisibleNotes} />

  <h1 className="header">Notes...</h1>
    <div className="NoteList">
    <AddNote setNotes={setNotes} setVisibleNotes={setVisibleNotes} userId={userId} setUserId={setUserId} notes={notes} visibleNotes={visibleNotes} creationDate={creationDate} setCreationDate={setCreationDate} />
        {visibleNotes.map((note) =>{
            return <div key={note.id}>

                <Note id= {note.id} title={note.title} content={note.content} date={note.Cdate} handleDeleteNote={delNote} creationDate={creationDate} setCreationDate={setCreationDate}  />

            </div>
         })} 
        </div>
        </div>
        </>
    )};