import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ darkMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Username or password incorrect!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={`w-full h-screen flex items-center justify-center `}>
      <div
        className={`w-9/12 relative hover:transform hover:scale-105 hover:rotate-4 transition-transform duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
        <div
          className={`shape p-8 hover:transform hover:scale-70 hover:rotate-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1),-1px_-1px_0px_0px_rgba(0,0,0,1)] transition-transform duration-300 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}>
          <div className="flex justify-between">
            <div className="mb-4 text-center">
              <p
                className={`text-2xl text-start font-bold ${
                  darkMode ? "text-white" : "text-black"
                }`}>
                Login
              </p>
              <p
                className={`text-sm text-start font-normal ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}>
                Fill this with your data
              </p>
            </div>
            <div className="mb-4 text-center">
              <button
                type="button"
                onClick={toggleModal}
                className={`px-4 py-2 bg-black text-white hover:bg-white hover:border-2 hover:border-black hover:text-black ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600 hover:border-white"
                    : ""
                }`}>
                <i className="fa-solid fa-circle-info"></i>
              </button>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="flex">
              <div
                className={`w-2/12 flex items-center justify-center ${
                  darkMode ? "text-white" : "text-black"
                }`}>
                <i className="fa-solid fa-user"></i>
              </div>
              <input
                type="text"
                className={`w-10/12 outline-none border-b-2 mx-5 my-7 py-1 ${
                  darkMode
                    ? "bg-gray-800 border-white text-white"
                    : "bg-white border-black text-black"
                }`}
                placeholder="Input your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <div
                className={`w-2/12 flex items-center justify-center ${
                  darkMode ? "text-white" : "text-black"
                }`}>
                <i className="fa-solid fa-key"></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-10/12 outline-none border-b-2 mx-5 my-7 py-1 ${
                  darkMode
                    ? "bg-gray-800 border-white text-white"
                    : "bg-white border-black text-black"
                }`}
                placeholder="Input your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`ml-2 border-b-2 mx-5 my-7 py-1 ${
                  darkMode
                    ? "text-white border-white"
                    : "text-black border-black"
                }`}>
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </button>
            </div>
            <div className="text-center mt-8">
              <button
                type="submit"
                className={`px-6 py-2 border-2 transition-colors duration-300 ${
                  darkMode
                    ? "border-white text-white hover:bg-gray-700 hover:text-white"
                    : "border-black text-primary hover:bg-black hover:text-white"
                }`}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${
            darkMode ? "bg-black bg-opacity-50" : "bg-black bg-opacity-50"
          }`}>
          <div
            className={`bg-white p-6 border-2 shadow-lg ${
              darkMode ? "border-gray-600" : "border-black"
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-black"
                }`}>
                Information
              </h2>
              <button
                onClick={toggleModal}
                className={`text-gray-500 hover:text-gray-800 ${
                  darkMode ? "text-gray-300 hover:text-gray-200" : ""
                }`}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex items-center mb-2">
              <i
                className={`fa-solid fa-user mr-2 ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}></i>
              <p
                className={`text-black ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}>
                Name: AdminPDNS
              </p>
            </div>
            <div className="flex items-center">
              <i
                className={`fa-solid fa-key mr-2 ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}></i>
              <p
                className={`text-black ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}>
                Password: Admin#123
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
