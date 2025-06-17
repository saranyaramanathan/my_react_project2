import { useState,useEffect } from "react";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { MdFilterList } from "react-icons/md";
import { RiArchiveLine } from "react-icons/ri";
import NoteItem from "../components/NoteItem.jsx";
import NoteModal from "../components/NoteModal.jsx";
function Notes({notes}){
    //console.log(notes)
    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState("");
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [showFilter, setShowFilter] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [selectedTag, setSelectedTag] = useState("");


    // Get all unique tags
    const allTags = [...new Set(notes.flatMap(note => note.tags))];

    // Filter notes by selected tag
    const filterNotes = selectedTag
        ? notes.filter(note => note.tags.includes(selectedTag))
        : notes;

    const archivedNotes = notes.filter(note => note.archived === true);
    const trashedNotes = notes.filter(note => note.trashed === true);
    const sortedNotes = [...notes].sort((a, b) => {
        if (a.pinned === b.pinned) return 0;
        return a.pinned ? -1 : 1;
    });
    //  const activeNotes =sortedNotes.filter(note => !note.archived && !note.trashed);
    // console.log("sorted_active",activeNotes)
    let dataToRender =[];
    
    if(filteredNotes.length>0 && !showFilter){
         console.log("inside filter",filterNotes) 
      dataToRender=filteredNotes.filter(note => !note.archived && !note.trashed);;
    }
    else if(filterNotes.length>0 && showFilter){
        console.log("inside filter1",filterNotes)
        dataToRender=filterNotes
    }else if(archivedNotes.length>0 && showArchived){
        dataToRender=archivedNotes
    }else if(trashedNotes.length>0 && showArchived){
        dataToRender=trashedNotes
    }
    
   
   const handleSearch = () => {
    setFilteredNotes(
      notes.filter((note) => {
        let filterTags;
        filterTags=(note.tags.map((tag)=>tag.toLowerCase()));
        console.log(filterTags)
        
        //search by tag
        // if(filterTags.some(filterTag => filterTag.includes(text.toLowerCase())))
        // {
        //   return note;
        // }
        if (note.title.toLowerCase().match(text.toLowerCase())) {
          return note;
          
        }
        if(note.details.toLowerCase().match(text.toLowerCase())){
            return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text]);

   return(
     <section className="lg:w-[80%] lg:p-10 h-[screen-4%] lg:gap-4 md:w-[90%] md:h-[90%] md:p-4 md:gap-3 flex justify-between items-center flex-col bg-[#171616] rounded-[12px] sm:w-[90%] sm:h-[90%] sm:p-3 sm:gap-3 w-full h-full p-2 gap-3">
      <header
        style={{ borderRadius: "7px 30px 30px 7px" }}
        className="notes_header lg:mb-3 h-[60px] w-full bg-[#1e1c1c] flex justify-between items-center pl-2 border-[1px] border-[#ffffff0a] border-solid"
      >
        {!showSearch && (
          <h2 className="text-[28px] text-white ml-5 font-['Poppu']">
            My Notes
          </h2>
        )}
        {showSearch && (
          <input
            className="border-none outline-none bg-transparent text-white h-[80%] w-[60%] pl-6 text-[16px] "
            type="text"
            autoFocus
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
            placeholder="Keywords..."
          />
        )}
        <div className="flex space-x-2 m-2">
        <button
          onClick={() => setShowSearch(!showSearch)}
          hidden={showFilter}
          className="rounded-full bg-gradient-to-br from-[#43CBFF] to-[#9708CC] flex items-center justify-center text-white w-[45px] h-[45px]"
        >
          {showSearch ? (
            <MdClose className="font-bold text-white" />
          ) : (
            <CiSearch className="font-bold" />
          )}
        </button>
        <button
          onClick={() => setShowFilter(!showFilter)}
          hidden={showSearch}
          className="rounded-full bg-gradient-to-br from-[#43CBFF] to-[#9708CC] flex items-center justify-center text-white w-[45px] h-[45px]"
        >
            <MdFilterList/>
        </button>
         <button
          onClick={()=>setShowArchived(!showArchived)}
          disabled={showFilter}
          className="rounded-full bg-gradient-to-br from-[#43CBFF] to-[#9708CC] flex items-center justify-center text-white w-[45px] h-[45px]"
        >
            <RiArchiveLine/>
        </button>
        </div>
      </header>
             {showFilter?<div className="w-full text-white rounded flex justify-end">
             <label className="block mb-2 font-medium">Filter by Tag: </label>
      <select
        className="border p-2 ml-2 text-gray-800  bg-white rounded mb-4"
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">All</option>
        {allTags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>
        </div>:<div></div>} 
      <div className="notes_container grid lg:grid-cols-4 md:grid-cols-3 md:mt-4 sm:grid-cols-2 xs:grid-col-1 flex-1 overflow-auto w-full gap-4 sm:mt-3 p-2 grid-cols-2">
        {filteredNotes.length == 0 && (
          <p className="text-white">No Notes Found!</p>
        )}
       {/* {!showFilter && !showArchived ?filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        )):filterNotes.map((note)=>(<NoteItem key={note.id} note={note}/>))} */}
        
       
        {showArchived?<div className="flex flex-col space-x-16 w-[100%] mx-auto">
          <div className="text-white  text-2xl flex flex-col my-4 gap-2 "><p className="my-4 bg-orange-600 border rounded text-center">Archive</p> 
          {archivedNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
          
        ))}
        </div>
         <div className="text-white  text-2xl flex flex-col"><p className="my-4 bg-red-600 border rounded text-center">Trash</p>
              {trashedNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
          
        ))}
        </div>
        </div>:dataToRender.map((note)=>(<NoteItem key={note.id} note={note}/>))}
      
          </div>
         
      <Link
        to={"/create-note"}
        className="flex justify-center align-middle lg:w-[120px] md:w-[220px] sm:w-[320px] w-full gap-2 lg:mt-3 md:mt-3 sm:mt-3 mt-4 bg-gradient-to-br from-[#43CBFF] to-[#9708CC] text-green-50 p-2 rounded-md"
      >
        ADD
        <BsPlusLg className="self-center text-white text-lg font-extrabold" />
      </Link>
    </section>
   );
}
export default Notes;