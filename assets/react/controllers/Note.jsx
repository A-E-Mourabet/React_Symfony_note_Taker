import { MdDeleteForever } from 'react-icons/md';
import React, { useEffect } from 'react';


const Note = ({id,title, content,date, handleDeleteNote , setCreationDate}) => {
    useEffect(() => {
        setCreationDate(new Date());
      }, []);

    
	return (

		<div className='note'>
            <div className="titleWrap">
                <span className="postedTitle" dangerouslySetInnerHTML={{ __html: title }}/>
                </div>
                <hr className={(title==="") ?"noteHr hidden" : "noteHr"}></hr>{title===""}
                <span className="postedNote" dangerouslySetInnerHTML={{ __html: content }}/>
			<div className='note-footer'>
				<small>{date.toString().split("T")[0]}</small>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
	);
};

export default Note;