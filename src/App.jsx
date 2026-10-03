import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import "./App.css";
function App() {
  // Load notes from localStorage
  //notes → notes ki current list setNotes → notes ko change/update karne ka function
  const [notes, setNotes] = useState(() => {
    //Browser ke localStorage mein "notes" naam se jo data save hai, woh nikal raha ha
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  // Add note
  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      title: note.title,
      content: note.content,
      date: new Date().toLocaleString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };
  // Delete note
  const deleteNote = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)
    );
  };
  // Edit note
  const editNote = (note) => {
    setEditingNote(note);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // Update note
  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>prevNotes.map((note) =>note.id === updatedNote.id
          ? {...updatedNote,date: new Date().toLocaleString()}: note
      )
    );
    setEditingNote(null);
  };
  // Cancel editing
  const cancelEdit = () => {
    setEditingNote(null);
  };
  // Search notes
  const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText)
    );
  });
  return (
    <div className="app">
      <header className="header">
        <h1>📝 Notes App</h1>
        <p>Write, edit and save your notes</p>
      </header>
      <main className="container">
        <NoteForm addNote={addNote} editingNote={editingNote} updateNote={updateNote} cancelEdit={cancelEdit}/>
        <SearchBar search={search} setSearch={setSearch}/>
        <div className="notes-header">
          <h2>My Notes</h2>
          <span>
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1 ? "Note" : "Notes"}
          </span>
        </div>
        {filteredNotes.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📝</div>
            <h3>No notes found</h3>
            <p>{search? "Try searching with another word.": "Create your first note above."}</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} deleteNote={deleteNote} editNote={editNote}/>
            ))}
          </div>
        )}
      </main>
      <footer>
        <p>Notes App © 2026</p>
      </footer>
    </div>
  );
}
export default App;