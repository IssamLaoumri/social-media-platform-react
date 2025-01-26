import './App.css';
import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
function App() {
  return (<div>
    <Routes>
      <Route path="/login" element={<Login />} exact />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </div>);
}

export default App;
