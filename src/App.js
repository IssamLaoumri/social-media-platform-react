import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import {useCallback, useEffect, useState} from "react";
import {logout} from "./slices/auth";
import {useDispatch, useSelector} from "react-redux";
import BoardUser from "./components/boards/BoardUser";
import BoardAdmin from "./components/boards/BoardAdmin";
function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const {user: currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (<Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              PROTORYPE
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>

              {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Moderator Board
                    </Link>
                  </li>
              )}

              {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
              )}

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
              )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
            )}
          </nav>
          <div className="container mt-3">
            <Routes>
              <Route path="/login" element={<Login/>} exact/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/settings" element={<Settings/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/user" element={<BoardUser/>}/>
              <Route path="/admin" element={<BoardAdmin/>}/>
            </Routes>
          </div>
        </div>
      </Router>
  );
}


export default App;
