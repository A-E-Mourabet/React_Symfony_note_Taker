import React, { useState , useEffect } from 'react';
import axios from 'axios';


const AddNote = ({ setNotes,setVisibleNotes,userId,setUserId ,notes ,visibleNotes, creationDate , setCreationDate }) => {
    const [ newNote , setNewNote ] = useState("");
    const [ newTitle , setNewTitle ] = useState("");
    const [ latestId, setLatestId] =useState(0);
	const characterLimitNote = 150;
    const characterLimitTitle = 34;

    //useEffects
    useEffect(() => {
        // Fetch the current user's ID
        axios.get('/getUserId')
            .then(response => {
                setUserId(response.data.user_id);
                console.log(response.data.user_id);
            })
            axios.get('/getNotes')
            .then(response => {
              const Notes = response.data.notes;
               Notes.forEach(note => {
                setNotes(currentNotes=>{return[...currentNotes, {id:note.id, content:note.content, title:note.title ,Cdate:note.creationDate}]});
                setVisibleNotes(currentNotes=>{return[...currentNotes, {id:note.id, content:note.content, title:note.title ,Cdate:note.creationDate}]});
                if(note.id > latestId){setLatestId(note.id)}
               });
           })
           .catch(error => {
              console.error('Error:', error);
           });
        }, []);


	const handleChangeNote = (event) => {
		if (characterLimitNote - event.target.value.length >= 0) {
			setNewNote(event.target.value);
		}
	};
    const handleChangeTitle = (event) => {
		if (characterLimitTitle - event.target.value.length >= 0) {
			setNewTitle(event.target.value);
		}
	};

	const handleSaveClick = () => {
		if (newNote.trim().length > 0) {
			addNote(newNote,newTitle);
			setNewNote("");
      setNewTitle("");
		}
	};

    function addNote(content,title){
        title = title.replace(/\n/g, '<br>');
        content=content.replace(/\n/g, '<br>');
    // sent to DataBase
        axios.post("/newNote" ,{title: title , content : content, userId : userId,creationDate:creationDate.toISOString()}).then(response =>{
          console.log(response.data.message);
          
          setNotes(currentNotes=>{return[...currentNotes, {id:response.data.id, content:content, title:title ,Cdate:creationDate}]});
          setVisibleNotes(currentVisibleNotes=>{return[...currentVisibleNotes, {id:response.data.id, content:content, title:title ,Cdate:creationDate}]});        

        }).catch(error => {
          console.error('Error saving data:', error);
        });
        
      };


	return (
		<div className='note new'>
            <textarea className='textAddContent'
				rows='1'
				cols='10'
				placeholder='Type to add a title...'
				value={newTitle}
				onChange={handleChangeTitle}
			></textarea>

            <hr className="noteHr"></hr>
			<textarea className='textAddContent'
				rows='8'
				cols='10'
				placeholder='Type to add a note...'
				value={newNote}
				onChange={handleChangeNote}
			></textarea>
			<div className='note-footer'>
				<small>
					{characterLimitNote - newNote.length} Remaining
				</small>
				<button className='save' onClick={handleSaveClick}>
					Save
				</button>
			</div>
		</div>
	);
};

export default AddNote;