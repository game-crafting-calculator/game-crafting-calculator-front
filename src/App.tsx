//router imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

//react imports
import React, { Context, createContext, Fragment, useState } from "react";

//import pages components
import ComponentsViewer from "./pages/components-viewer/components-viewer";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";

//import services
import userService from "./services/user-service";

//types import
import { User } from "./types";

//global context import
import { UserContext } from "./global-context";

//import icons
import { CgProfile } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

//import CSS
import "./App.css";
import useVH from "react-viewport-height";
import Recipe from "./pages/recipe/recipe";

//Functions
function ProtectedPage(props: any) {
  const authGuard = (component: any) => {
    return userService.isLoggedIn() ? component : props.unloggedElement;
  };
  return <Fragment>{authGuard(props.element)}</Fragment>;
}

function App() {
  //Global States
  const [user, setUser] = useState<User>({});

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <div className="app">
          <div className="page">
            <Routes>
              {/* Root */}
              <Route path="/" element={<Navigate to="/viewer" />} />

              {/* Unprotected Routes */}
              <Route path="/recipe/" element={<Recipe />} />
              <Route path="/recipe/:id" element={<Recipe />} />

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

              {/* Fallback route aka 404 */}
              <Route
                path="*"
                element={
                  <div>
                    <h1>404 Page not found</h1>
                  </div>
                }
              ></Route>
            </Routes>
          </div>
          <div className="navbar">
            <Link to={"/"}>
              <AiOutlineHome />
            </Link>
            <Link to={"/profile"}>
              <CgProfile />
            </Link>
            <Link to={"/recipes"}>
              <FaList />
            </Link>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
