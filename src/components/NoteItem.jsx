import React from "react";
import { Link } from "react-router";

const NoteItem = ({ note }) => {
  

  return (
    <Link
      to={note.trashed ? `edit-note/${note.id}` : `notemodal/${note.id}`}
      className="note bg-gradient-to-r from-[#222] to-[#1e1e1e1a] lg:p-4 md:p-4 sm:p-2 p-1 rounded-md flex flex-col justify-between items-start border-[1px] border-[#ffffff0a] border-solid h-[150px]"
    >
      <h4 className="text-[#FFF] lg:text-xl md:text-lg sm:text-sm text-xs">
        {note.title.length > 20 ? note.title.substr(0, 20) + "..." : note.title}
      </h4>
      {note.pinned == true ? <p className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">

        {note.pinned ? "📌pinned" : ""}</p> : <div></div>}
      <p className="text-[rgba(255,255,255,0.50)] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]">{note.date}</p>
      <div className="tags">
        {note.tags.length > 0 ? <p className="text-[rgba(255,255,255,0.50)] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[10px]"> {note.tags.map(tag => <span key={tag} className="tag">{`#${tag} `}</span>)}</p> : <p></p>}
      </div>
    </Link>
  );
};

export default NoteItem;