import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

export default function Dashboard({ toggleDarkMode, darkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate("/");
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = storedUsers.filter(
      (u) => u.username !== loggedInUser.username
    );
    setUsers(filteredUsers);

    const { page = 1, search = "" } = queryString.parse(location.search);
    setCurrentPage(Number(page));
    setSearchTerm(search);
  }, [navigate, location.search]);

  useEffect(() => {
    const query = queryString.stringify({
      page: currentPage,
      search: searchTerm,
    });
    navigate(`?${query}`);
  }, [currentPage, searchTerm, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    localStorage.setItem("searchTerm", value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = () => {
    if (userToDelete === "AdminPDNS") {
      alert("Cannot delete the default admin account!");
      setShowDeleteModal(false);
      return;
    }

    const updatedUsers = users.filter((u) => u.username !== userToDelete);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const confirmDeleteUser = (username) => {
    setUserToDelete(username);
    setShowDeleteModal(true);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      <nav className="bg-white dark:bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Dashboard</div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-sm flex items-center space-x-2">
              <i className="fa-solid fa-user"></i>
              <span>{user?.username}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-black shadow-xl border-white dark:border-black">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fa-solid fa-user-pen"></i> Edit Profile
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fa-solid fa-circle-half-stroke"></i>{" "}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8 w-10/12">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/add-user")}
            className="px-4 py-2 bg-black text-white border-2 border-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:border-black dark:hover:bg-black dark:hover:text-white">
            Add
          </button>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center">
            <input
              type="text"
              placeholder="Search User..."
              className={
                "w-full p-2 border border-black text-black dark:border-white "
              }
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>

          {/* <input
            type="text"
            className={`w-full p-2 border ${
              darkMode
                ? "bg-gray-800 border-white text-white"
                : "bg-white border-black text-black"
            }`}
            value={searchTerm}
            onChange={handleSearch}
          /> */}
        </div>

        {currentUsers.length > 0 ? (
          <table className="w-full bg-white dark:bg-black shadow-md mb-4">
            <thead>
              <tr className="bg-black text-white dark:bg-white dark:text-black border-2 border-white dark:border-black">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.username} className="border-b">
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(`/edit-user?username=${user.username}`)
                      }
                      className="mr-2 px-4 py-2 bg-yellow-500 text-white dark:bg-yellow-700 hover:bg-yellow-700 dark:hover:bg-yellow-500">
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDeleteUser(user.username)}
                      className="px-4 py-2 bg-red-500 text-white hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-white text-center bg-black">Empty Data</p>
        )}

        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={filteredUsers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 border-2 border-black shadow-lg">
            <p className="text-black text-center mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-700">
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-black hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Pagination({ usersPerPage, totalUsers, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="inline-flex items-center -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight text-gray-500 bg-white dark:bg-black border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white ${
                currentPage === number ? "bg-gray-300 dark:bg-gray-600" : ""
              }`}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
