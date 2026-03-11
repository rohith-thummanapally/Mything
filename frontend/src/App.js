import Sidebar from "./components/Sidebar";
import Login from "./screens/Login.js";
import Notes from "./screens/Notes.js";
import Expenses from "./screens/Expenses.js";
import Lendings from "./screens/Lendings.js";
import Journals from "./screens/Journals.js";
import Dashbaord from "./screens/Dashboard.js";
import { Provider } from "react-redux";
import { mystore } from "./store.js";
import { createBrowserRouter, BrowserRouter, Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authstate } from "./redux/authSlice.js";
import { injectStore } from "./Utils/apiCalls.js";

injectStore(mystore);

const PrivateRoute = ({ children }) => {
  const { JWTToken } = useSelector(authstate);
  // If there is no token, redirect to login page
  if (!JWTToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Provider store={mystore}>
      <BrowserRouter>
        <div style={{ width: '100%', height: '100%' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashbaord /></PrivateRoute>} />
            <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
            <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
            <Route path="/lendings" element={<PrivateRoute><Lendings /></PrivateRoute>} />
            <Route path="/journals" element={<PrivateRoute><Journals /></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
