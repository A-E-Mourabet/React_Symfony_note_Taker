import React, { useEffect, useState } from 'react';
import { NoteForm } from "./Form";
import { AnimatedDel } from "./AnimatedDel";
import { DeleteButtons } from "./DeleteButtons";
import { SearchBar } from "./SearchBar";
import "../../styles/AppStyle.scss";

export default function App(){
  // useStates:
  const [notes,setNotes]=useState([])
  const [visibleNotes,setVisibleNotes]=useState([])
  const [showCloseButtons, setShowCloseButtons] = useState(false);
  const [userId, setUserId] = useState(null);

  // functions:
  function toggleDel(note){
    // note.checked= ! note.checked;
    const updatedNotes = notes.map((n) => {
      if (n.id === note.id) {
        return { ...n, checked: !n.checked };
      }
      return n;
    });
    const updatedVisibleNotes = visibleNotes.map((n) => {
      if (n.id === note.id) {
        return { ...n, checked: !n.checked };
      }
      return n;
    });
      setNotes(updatedNotes);
      setVisibleNotes(updatedVisibleNotes);
      console.log("checked");
  }
 // returned HTML
  return(
  <>

  <p className="ListTitle">React ~ Notes</p>
  <hr className="line"></hr>
  <NoteForm setNotes={setNotes} setVisibleNotes={setVisibleNotes} userId={userId} setUserId={setUserId}/>

  <SearchBar notes={notes} visibleNotes={visibleNotes} setVisibleNotes={setVisibleNotes} />

  <DeleteButtons  visibleNotes={visibleNotes}  notes={notes} setNotes={setNotes} showCloseButtons={showCloseButtons} setShowCloseButtons={setShowCloseButtons} setVisibleNotes={setVisibleNotes} />
  <h1 className="header">Notes...</h1>
    <div className="column-container">
      <div className="column">
        {visibleNotes.map((note,index) =>{
          if(!(index%2)){
            return <div key={note.id}>
              <div className=" NoteClose">
                <div className={showCloseButtons ? "closeButton" : "closeButton hidden"} >
                  <label></label>
                  <input type="checkbox" className="closeButtonIn" onChange={() => toggleDel(note)}/>
                  <AnimatedDel/>
                </div>
                <div className="titleWrap">
                <p className="postedTitle" dangerouslySetInnerHTML={{ __html: note.title }}/>
                </div>
                <hr className={(note.title==="") ?"noteHr hidden" : "noteHr"}></hr>{note.title===""}
                <p className="postedNote" dangerouslySetInnerHTML={{ __html: note.content }}/>
              </div>
            </div>
          }
        })}
      </div>
      <div className="column">
        {visibleNotes.map((note, index) => {
          if(index%2){
            return <div key={note.id}>
              <div className=" NoteClose">
                <div className={showCloseButtons ? "closeButton" : "closeButton hidden"}>
                  <label></label>
                  <input type="checkbox" className="closeButtonIn" onChange={() => toggleDel(note)}/>   
                  <AnimatedDel/>
                </div>
                <div className="titleWrap">
                <p className="postedTitle" dangerouslySetInnerHTML={{ __html: note.title }}/>
                </div>
                <hr className={(note.title==="") ?"noteHr hidden" : "noteHr"}></hr>
              <p className="postedNote" dangerouslySetInnerHTML={{ __html: note.content }}/>
              </div>
            </div>
          }
        })}
      </div>

    </div>
  </>

    )};