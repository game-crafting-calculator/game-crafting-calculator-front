import "./App.css";

//ROUTER IMPORTS
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import React, { Fragment, useState } from "react";

//PAGES
import ComponentsViewer from "./pages/components-viewer/components-viewer";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import userService from "./services/user-service";

function ProtectedPage(props: any) {
  const authGuard = (component: any) => {
    return userService.isLoggedIn() ? component : props.unloggedElement;
  };
  return <Fragment>{authGuard(props.element)}</Fragment>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/viewer" />} />

        {/* Unprotected routes */}
        <Route path="/register" element={<Register />}></Route>

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

        {/* route to protect later */}

        {/* Fallback route aka 404 */}
        <Route path="*" element={<h1>404 Page not found</h1>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
