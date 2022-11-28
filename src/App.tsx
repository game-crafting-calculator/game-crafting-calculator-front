import "./App.css";

//ROUTER IMPORTS
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//PAGES
import ComponentsViewer from "./pages/components-viewer/components-viewer";
import Register from "./pages/register/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/viewer" element={<ComponentsViewer />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
