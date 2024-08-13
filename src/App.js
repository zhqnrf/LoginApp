import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    console.log("Dark mode state updated:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const defaultAdmin = storedUsers.find(
      (u) => u.username === "AdminPDNS" && u.password === "Admin#123"
    );

    if (!defaultAdmin) {
      storedUsers.push({
        username: "AdminPDNS",
        password: "Admin#123",
        isAdmin: true,
      });
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }
  }, []);

  return (
    <div
      className={`${
        darkMode ? "dark bg-black text-white" : "bg-white text-black"
      } min-h-screen`}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={Dashboard}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/edit-profile"
            element={<PrivateRoute element={EditProfile} />}
          />
          <Route
            path="/add-user"
            element={<PrivateRoute element={AddUser} />}
          />
          <Route
            path="/edit-user"
            element={<PrivateRoute element={EditUser} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
