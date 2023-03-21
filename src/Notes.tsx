import React, {useState, useEffect} from 'react';
import './Notes.css';
import { nanoid } from 'nanoid';


const NotesApp = () => {

    const Draggable = require('react-draggable');
    const [newNoteColor, setNewNoteColor] = useState("#86bbd8")

    const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '1996-12-01',
            position: {x: 50, y: 50},
            color: "#86bbd8"
		},
	]);

    useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem("notes_storage_data")!);        
		if (savedNotes) {
			setNotes(savedNotes)
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("notes_storage_data", JSON.stringify(notes));
	}, [notes]);

    const [NewNoteText, setNewNoteText] = useState("");

    const handleChange = (event: any) => {
        setNewNoteText(event.target.value)
    }

    const addNewNote = () => {
        const date = new Date()
        const newNote = {
            id: nanoid(),
            text: NewNoteText,
            date: date.toLocaleDateString(),
            position: {x: 1000, y: 350},
            color: newNoteColor
        }
        const tempNewNote = [...notes, newNote]
        setNotes(tempNewNote)
        setNewNoteText("")
    }

    const changeExisting = (e: any, id: any) => {
        const NoteIndex = notes.findIndex((note) => note.id === id);
        const updatedNote = Object.assign({}, notes[NoteIndex]);
        updatedNote.text = e.target.value;        
        const newNotes = notes.slice();
        newNotes[NoteIndex] = updatedNote;
        setNotes(newNotes);
    }

    const changePosition = (data: any, id: any) => {
        const NoteIndex = notes.findIndex((note) => note.id === id);
        const updatedNote = Object.assign({}, notes[NoteIndex]);
        updatedNote.position = {x: data.x, y: data.y};
        const newNotes = notes.slice();
        newNotes[NoteIndex] = updatedNote;
        setNotes(newNotes);
    }

    const colorOfNewNote = (e: any, color: string) => {
        const SelectedColor = document.getElementsByClassName("SelectedColor")
        while (SelectedColor.length) {
            SelectedColor[0].classList.remove("SelectedColor")
        }
        e.target.classList.add("SelectedColor")
        setNewNoteColor(color)   
    }



    return (
        <div>
            
            
            <div className='notes_list'>
            {notes.map((note) => (
                <Draggable handle=".note" cancel=".note_text, .delete_icon" key={note.id} defaultPosition={note.position} onStop={(e: any, data: any)=>changePosition(data, note.id)}>
                <div style={{backgroundColor: note.color}} className='note' >
                    <span className="material-icons">drag_handle</span>
                    <textarea className='note_text'
                        value={note.text}
                        onChange={(e)=>changeExisting(e, note.id)}>
                    </textarea>

                    <div className='note_footer'>
                        <p>{note.date}</p>
                        <img onClick={() => {setNotes(notes.filter(a => a.id !== note.id))}} className='delete_icon' width={25} height={25} src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" />
                    </div>
                    
                </div>
                </Draggable>               
            ))}
            </div>

            <div className='create_note'>
                <textarea
                    className='create_textarea'
                    placeholder='Write a new note...'
                    value={NewNoteText}
                    onChange={handleChange}
                ></textarea>
                <div className='create_note_footer'>
                    <button className='save' onClick={addNewNote}>Save</button>
                    <button className="colorPicker red SelectedColor" onClick={(e) => colorOfNewNote(e, "#86bbd8")}></button>
                    <button className="colorPicker green" onClick={(e) => colorOfNewNote(e, "#a37fc2")}></button>
                    <button className="colorPicker blue" onClick={(e) => colorOfNewNote(e, "#f5a763")}></button>
                    <button className="colorPicker yellow" onClick={(e) => colorOfNewNote(e, "#5b8e7d")}></button>
                    <button className="colorPicker aqua" onClick={(e) => colorOfNewNote(e, "#c25b61")}></button>
                    
                </div>
            </div>



        </div>
    );
}

export default NotesApp;

{/* https://www.youtube.com/watch?v=8KB3DHI-QbM 
    https://github.com/chrisblakely01/react-notes-app
    
    https://paydendyer.github.io/react-notes-app/


    https://dev.to/andyrewlee/how-to-update-an-array-of-objects-in-react-state-3d
    https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np
    
    Draggable to localstorage:
    https://github.com/victoria-lo/bulletin-board/blob/master/src/App.js
    https://victoria-lo.github.io/bulletin-board/
    https://www.npmjs.com/package/react-draggable

    Style radio button color:
    https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_radio
    https://github.com/LalitKumar234/Notes-Taking-App/blob/main/src/Components/SideNav/SideNav.jsx

    Kvar å göra:
    - Edit button. Efter click av edit så skapas en ny usestate med data från den
    klickade noten = KLAR
    - CSS
    - ta bort note placeholders = KLAR
    - färger på notesen, man väljer själv = KLAR
    - spara draggable location till local storage? = KLAR
    - ta bort oanvända bakgrundsbilden = KLAR 
    - Bra färger

*/}