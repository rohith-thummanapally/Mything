import Sidebar from "./components/Sidebar";
import Notes from "./screens/Notes.js";
import Expenses from "./screens/Expenses.js";
import Lendings from "./screens/Lendings.js";
import Journals from "./screens/Journals.js";
import Dashbaord from "./screens/Dashboard.js";
import { createBrowserRouter,BrowserRouter,Router,Route,Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <div style={{width:'100%',height:'100%'}}>
      <Routes>
        <Route path="/" element={<Dashbaord />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/lendings" element={<Lendings />} />
        <Route path="/journals" element={<Journals />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
