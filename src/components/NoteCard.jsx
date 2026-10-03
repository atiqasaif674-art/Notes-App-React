function NoteCard({ note, deleteNote, editNote }) {
  return (
    <div className="note-card">
      <div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <small>{note.date}</small>
      </div>
      <div className="note-actions">
        <button className="edit-btn" onClick={() => editNote(note)}>
          ✏️ Edit
        </button>
        <button className="delete-btn" onClick={() => deleteNote(note.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
export default NoteCard;