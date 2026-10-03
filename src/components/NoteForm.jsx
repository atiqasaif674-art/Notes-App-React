import { useState, useEffect } from "react";
//addNote       → naya note add karna
// editingNote   → jis note ko edit kar rahe hain
// updateNote    → existing note update karna
// cancelEdit    → editing cancel karna
//Parent se kuch aisa aa sakta:<NoteForm addNote={addNote} editingNote={editingNote} updateNote={updateNote} cancelEdit={cancelEdit}/>
function NoteForm({ addNote, editingNote, updateNote, cancelEdit }) {
  //Yahan note ka title store hoga
  const [title, setTitle] = useState("");
  //Ye note ka main content store karega
  const [content, setContent] = useState("");
  //Jab editingNote change ho, ye code dobara chalega editingNote change tu ya chala g
  useEffect(() => {
    //Kya koi note currently edit ho raha hai?Agar haanal, editingNote mein note ka data hoga.
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //Ye check karta hai ke title aur content khali to nahi
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and note!");
      return;
    }
    if (editingNote) {
      updateNote({
        ...editingNote,
        title,
        content,
      });
    } else {
      addNote({
        title,
        content,
      });
    }
    setTitle("");
    setContent("");
  };
  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Note title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
      <textarea placeholder="Write your note..." value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="form-buttons">
        <button type="submit" className="save-btn">
          {editingNote ? "Update Note" : "Add Note"}
        </button>
        {editingNote && (
          <button type="button" className="cancel-btn" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
export default NoteForm;