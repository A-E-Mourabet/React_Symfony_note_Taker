  import React, { useEffect, useState } from 'react';
  import axios from 'axios';


  export  function NoteForm({setNotes,setVisibleNotes,userId,setUserId}){

  const [ newNote , setNewNote ] = useState("")
  const [ newTitle , setNewTitle ] = useState("")

  // const [notes,setNotes]=useState([])
  ////UseEffect
  useEffect(() => {
    // Fetch the current user's ID
    axios.get('/getUserId')
        .then(response => {
            setUserId(response.data.user_id);
            console.log(response.data.user_id);
        })
        // console.log("i'm here!")
        axios.get('/getNotes')
        .then(response => {
          const notes = response.data.notes;
           notes.forEach(note => {
            setNotes(currentNotes=>{return[...currentNotes, {id:note.id, content:note.content, title:note.title ,checked:false}]});
            setVisibleNotes(currentNotes=>{return[...currentNotes, {id:note.id, content:note.content, title:note.title ,checked:false}]});
              console.log('Note id:', note.id);

           });
       })
       .catch(error => {
          console.error('Error:', error);
       });
    }, []);
  // 


  function handleSubmit(e){
      e.preventDefault();
      if(newNote==="") return
            addNote(newNote,newTitle);
          
      setNewNote("");
      setNewTitle("");
      };


    function addNote(content,title){
      title = title.replace(/\n/g, '<br>');
      content=content.replace(/\n/g, '<br>');
  // sent to DataBase
      axios.post("/newNote" ,{title: title , content : content, userId : userId}).then(response =>{
        console.log(response.data.message);
      }).catch(error => {
        console.error('Error saving data:', error);
      });
      axios.get('/getNotes')
      .then(response => {
        const notes = response.data.notes;
        setNotes([]);
        setVisibleNotes([]);
        notes.forEach(note => {
          setNotes(currentNotes=>{return[...currentNotes, {id:note.id, content:note.content, title:note.title ,checked:false}]});
          setVisibleNotes(currentNotes=>{return[...currentNotes, {id:note.id, content:note.content, title:note.title ,checked:false}]});
          console.log('Note id:', note.id);
         });
     });
    };
    

  return(

  <form className="Form" onSubmit={handleSubmit}>
      <div className="newNote">
      <div className="labelWrap">
        <label className="titleLabel">title:</label>
        </div>
      <input className="InputSpace" type="text" id="noteTitle" style={{width:700}}  onChange={e => setNewTitle(e.target.value)} value={newTitle}/>
        {/* <hr></hr> */}
        <div className="labelWrap">
          <label className="noteLabel">Note :</label>
        </div>
        <textarea className="InputSpace" id="noteContent" style={{height: 200, width:700, }}  onChange={e => setNewNote(e.target.value)} value={newNote}/>
      </div>
      <div className="InputButtonWrap">
      <button className="InputNewNote"><span className="text">add Note</span></button></div>
    </form>
  );
  }