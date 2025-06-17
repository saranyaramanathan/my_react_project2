import { Link,useParams,useNavigate } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEditCircleLine } from "react-icons/ri";
function NoteModal({ notes, onClose,setNotes }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const note = notes.find((item) => item.id == id);
    const togglePin = (id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, pinned: !note.pinned } : note
            )
        );
    };

    const toggleArchive = (id) => {
        setNotes(prev =>
            prev.map(note =>
                note.id === id ? { ...note, archived: !note.archived } : note
            )
        );
    };

    const toggleTrash = (id) => {
        setNotes(prev =>
            prev.map(note =>
                note.id === id ? { ...note, trashed: !note.trashed } : note
            )
        );
    };

    if (!note) return null;
    
    const handleClose = () => {

        navigate("/");
    }
    
    const handleEdit =()=>{
        navigate(`/edit-note/${id}`)
    }
  return (
      <div className="fixed p-2 overflow-y-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
          <div
              className="bg-white rounded-xl shadow-lg p-6 my-auto  w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
          >
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <p className="text-gray-700 mb-4">{note.details}</p>
              <div className="flex flex-wrap gap-2 mb-4 ">
                  {note.tags.map((tag) => (
                      <span
                          key={tag}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                          {`#${tag}`}
                      </span>
                  ))}
              </div>
              <button

                  className="absolute top-2 right-3 rounded-full bg-gradient-to-br from-[#43CBFF] to-[#9708CC] flex items-center justify-center text-white w-[45px] h-[45px]"
                  onClick={handleClose}
              >
                  ✕
              </button>

              <button

                  className="absolute top-2 right-16 rounded-full bg-gradient-to-br from-[#43CBFF] to-[#9708CC] flex items-center justify-center text-white w-[45px] h-[45px]"
                  onClick={handleEdit}
              >
                  <RiEditCircleLine />
              </button>
              <button

                  onClick={(e) => {
                      e.stopPropagation(); // prevent triggering modal if any
                      togglePin(note.id);
                  }}
                  className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
              >
                  {note.pinned ? "📌 Unpin" : "📌 Pin"}
              </button>
              <button onClick={() => toggleArchive(note.id)} className="text-xs p-2">
                  {note.archived ? "Unarchive" : "Archive"}
              </button>
              <button onClick={() => toggleTrash(note.id)} className="text-xs p-2">
                  {note.trashed ? "Untrashed" : "Move to Trash"}
              </button>
          </div>
      </div>
  );
}
export default NoteModal;