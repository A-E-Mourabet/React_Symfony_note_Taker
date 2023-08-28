import { MdDeleteForever } from 'react-icons/md';
import React, { useEffect } from 'react';


const ListedNote = ({ id,title, content,date, handleDeleteNote , creationDate , setCreationDate}) => {
    useEffect(() => {
        setCreationDate(new Date());
      }, []);

    
	return (
		<div className='listedNote'>
            if(title){
            <div className="titleWrap list">
                <span className="postedTitle list" dangerouslySetInnerHTML={{ __html: title }}/>
                </div>
                }
                <span className="postedNote list" dangerouslySetInnerHTML={{ __html: content }}/>
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

export default ListedNote;