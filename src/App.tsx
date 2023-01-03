//router imports
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

//react imports
import React, {
  Context,
  createContext,
  Fragment,
  useState,
  useEffect,
} from "react";

//import pages components
import ComponentsViewer from "./pages/components-viewer/components-viewer";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";

//import services

//types import
import { User } from "./types";

//global context import
import { UserContext } from "./global-context";

//import icons
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";

//import CSS
import "./App.css";
import Recipe from "./pages/recipe/recipe";
import Bookmarks from "./pages/bookmarks/bookmarks";

//import assets
import backgroundImage from "/background_image.jpg";
import { getToken } from "./services/local-storage-service";

//Functions
function ProtectedPage(props: any) {
  const authGuard = (component: any) => {
    return getToken() ? component : props.unloggedElement;
  };
  return <Fragment>{authGuard(props.element)}</Fragment>;
}

function App() {
  //Global States
  const [user, setUser] = useState<User>({});
  useEffect(() => {
    console.log(backgroundImage);
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <div className="app">
          <div
            className="background-image"
            style={{
              // For image url, use relative path starting by ./
              backgroundImage: `linear-gradient(
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.8)
          ),url(./${backgroundImage})`,
            }}
          ></div>
          <div className="page">
            <Routes>
              {/* Root */}
              <Route path="/" element={<Navigate to="/recipes" />} />

              {/* Unprotected Routes */}
              <Route path="/recipes/" element={<Recipe />} />
              <Route path="/recipes/:recipe_id" element={<Recipe />} />

              {/* Allow register route only if user not logged in */}
              <Route
                path="/register"
                element={
                  <ProtectedPage
                    unloggedElement={<Register />}
                    element={<Navigate to="/" />}
                  />
                }
              />

              {/* Allow login route only if user not logged in */}
              <Route
                path="/login"
                element={
                  <ProtectedPage
                    unloggedElement={<Login />}
                    element={<Navigate to="/" />}
                  />
                }
              />

              {/* Protected routes */}
              <Route
                path="/viewer"
                element={
                  <ProtectedPage
                    unloggedElement={<Navigate to="/login" />}
                    element={<ComponentsViewer />}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedPage
                    unloggedElement={<Navigate to="/login" />}
                    element={<Profile />}
                  />
                }
              />

              <Route
                path="/bookmarks"
                element={
                  <ProtectedPage
                    unloggedElement={<Navigate to="/login" />}
                    element={<Bookmarks />}
                  />
                }
              />

              {/* Fallback route aka 404 */}
              <Route
                path="*"
                element={
                  <div>
                    <h1>404 Page not foundahahaha</h1>
                  </div>
                }
              ></Route>
            </Routes>
          </div>
          <div className="navbar">
            <Link to={"/"}>
              <AiOutlineHome />
              <p className="navbar-text">Home</p>
            </Link>
            <Link to={"/profile"}>
              <CgProfile />
              <p className="navbar-text">Profile</p>
            </Link>
            {/* <Link to={"/recipes"}>
              <FaList />
              <p className="navbar-text">Recipes</p>
            </Link> */}
            <Link to={"/bookmarks"}>
              <AiOutlineStar />
              <p className="navbar-text">Bookmarks</p>
            </Link>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

{
}
