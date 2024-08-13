import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser({ darkMode }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAddUser = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = { username, password };
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
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
      <h1 className={`text-center text-2xl font-bold mb-4`}>Add User</h1>
      <form onSubmit={handleAddUser}>
        <div className="mb-4">
          <label className={`block `}>Name:</label>
          <input
            type="text"
            className={`w-full p-2 border `}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block `}>Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-2 border ${
                darkMode ? "border-white bg-black " : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
