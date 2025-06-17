import { useState } from "react";
import { useNavigate,Link } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { v4 as uuid } from "uuid";
import useCreateDate from "../components/useCreateDate";
function CreateNote({setNotes}){
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [tags, setTags] = useState("");
    const [pinned, setPinned] = useState(false);
    const [archived, setArchived] = useState(false);
    const [trashed, setTrashed] = useState(false);
    const date = useCreateDate();
    const navigate = useNavigate();
   const handleSubmit = (e) => {
    e.preventDefault();

    if (title && details) {
      const note = {
        id: uuid(),
        title,
        details,
        date,
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        pinned,
        archived,
        trashed
      };

      //Add note to notes array
      setNotes((prevNotes) => [note, ...prevNotes]);
      // console.log(note);

      // redirect to home page
      navigate("/");
    }
  };
    return(
         <section className="lg:w-1/2 flex justify-center items-center gap-4 flex-col md:w-[80%] p-6 bg-[#141313] rounded-md sm:w-[90%] w-full">
      <header className="create_note_header flex justify-between items-center w-full ">
        <Link
          to={"/"}
          className="rounded-md bg-transparent text-white p-3 font-extrabold text-lg border-[2px] border-[#ffffff31] border-solid"
        >
          <IoIosArrowBack />
        </Link>
        <button
          onClick={handleSubmit}
          className="rounded-md bg-transparent text-white px-4 py-2 border-[2px] border-[#ffffff31] lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]"
        >
          Save Note
        </button>
      </header>
      <form
        onSubmit={handleSubmit}
        className="create_note_form w-full gap-3 flex mt-3 flex-col items-center justify-center "
      >
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
          className="w-full outline-none p-4 text-2xl text-white bg-[#ffffff03] rounded-t-md border-[1px] border-[#ffffff1a] border-solid lg:text-[20px] md:text-[18px] sm:text-[18px] text-[16px]"
        />
        <textarea
          rows="10"
          placeholder="Notes Details..."
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          className="w-full outline-none text-white p-4 bg-[#ffffff03] resize-none rounded-b-md border-[1px] border-[#ffffff1a] border-solid lg:text-[18px] md:text-[16px] sm:text-[16px] text-[14px]"
        ></textarea>
         <input 
         type="text"
         placeholder="Tags (comma separated)"
         value={tags} 
         onChange={e => setTags(e.target.value)} 
          className="w-full outline-none p-4 text-2xl text-white bg-[#ffffff03] rounded-t-md border-[1px] border-[#ffffff1a] border-solid lg:text-[20px] md:text-[18px] sm:text-[18px] text-[16px]"/>
      </form>
    </section>
    );

}
export default CreateNote;