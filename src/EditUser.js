import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

export default function EditUser({ darkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const { username } = queryString.parse(location.search);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userToEdit = users.find((u) => u.username === username);
    if (userToEdit) {
      setUsername(userToEdit.username);
      setPassword(userToEdit.password);
    }
  }, [location.search]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.username === username ? { username, password } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-8 w-10/12">
      <h1 className={`text-center text-2xl font-bold mb-4 `}>Edit User</h1>
      <form onSubmit={handleUpdateUser}>
        <div className="mb-4">
          <label className={`block `}>Name:</label>
          <input
            type="text"
            className={`w-full p-2 border ${
              darkMode ? "border-white bg-black " : "border-gray-300"
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block`}>Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-2 border ${
                darkMode ? "border-white bg-black " : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              readOnly
            />
            <button
              type="button"
              className={`absolute inset-y-0 right-0 px-3 py-2 text-sm ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
              onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className={`px-4 py-2 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-900"
                : "bg-gray-500 text-white hover:bg-gray-700"
            }`}
            onClick={handleBack}>
            Back
          </button>
          <button
            type="submit"
            className={`px-4 py-2 ${
              darkMode
                ? "bg-white text-black hover:bg-gray-400"
                : "bg-black text-white hover:bg-gray-700"
            }`}>
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}
