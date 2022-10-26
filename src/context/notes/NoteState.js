import React,{useState} from 'react'
import NoteContext from './NoteContext'

const NoteState = (props)=>{
    const host = 'http://localhost:9000'
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial);

    // Get Note
    const getNote = async()=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method : 'GET',
            headers: {
                'Content_Type':'application/json',
                'authtoken':localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }
    // Add a Note
    const addNote = async(title,description,tag)=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/addnotes`,{
            method : 'POST',
            headers: {
                'Content_Type':'application/json',
                'authtoken':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note = await response.json()
        setNotes(notes.concat(note))
    }
    // Delete a Note
    const deleteNote = async(id)=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method : 'DELETE',
            headers: {
                'Content_Type':'application/json',
                'authtoken':localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json);

        setNotes(notes.filter((note)=>{return note._id !== id}))
    }
    // Edit a Note
    const editNote = async(id,title,description,tag)=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method : 'PUT',
            headers: {
                'Content_Type':'application/json',
                'authtoken':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json()
        console.log(json);

        let newNotes = await JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id)  {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
            
        }
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;