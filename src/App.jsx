
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router' 
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import { Helmet } from 'react-helmet';
import { useState, useEffect } from "react";
import NoteModal from './components/NoteModal';

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  // console.log(notes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <main className="app w-screen h-screen flex justify-center py-3 p-2 items-center bg-sky-100 ">
        <Helmet>
                <meta charSet="utf-8" />
                <title>My Notes</title>
               
            </Helmet>
        <Routes>
          <Route path="/" element={<Notes notes={notes} />} />
          <Route
            path="/create-note"
            element={<CreateNote setNotes={setNotes} />}
          />
          <Route
            path="/edit-note/:id"
            element={<EditNote notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/notemodal/:id"
            element={<NoteModal notes={notes} setNotes={setNotes}/>}/>
        </Routes>
      
    </main>
  );
}

export default App
