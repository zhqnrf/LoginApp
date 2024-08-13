import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ darkMode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setName(loggedInUser.username);
      setPassword(loggedInUser.password);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, username: name, password: password };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
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
      <h1 className={`text-center text-2xl font-bold mb-4 `}>Edit Profile</h1>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className={`block`}>Name:</label>
          <input
            type="text"
            className={`w-full p-2 border ${
              darkMode
                ? "bg-gray-800 border-white text-white"
                : "bg-white border-black text-black"
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block `}>Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full p-2 border ${
                darkMode
                  ? "bg-gray-800 border-white text-white"
                  : "bg-white border-black text-black"
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
