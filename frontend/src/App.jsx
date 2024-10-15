import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", userName: "", email: "" });
  const [editingUserId, setEditingUserId] = useState(null);

  // READ: Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://crud-mern-stack-api-gamma.vercel.app//read");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // CREATE: Add a new user
  const createUser = async () => {
    if (!newUser.name || !newUser.username || !newUser.email) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/create",
        newUser
      );
      console.log("User created:", response.data);
      fetchUsers(); 
      setNewUser({ name: "", userName: "", email: "" }); 
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // UPDATE: Update user
  const updateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/update/${editingUserId}`,
        newUser
      );
      console.log("User updated:", response.data);
      fetchUsers();
      setNewUser({ name: "", userName: "", email: "" });
      setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // DELETE: Delete a user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete/${id}`);
      console.log("User deleted:", response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user) => {
    setNewUser({ name: user.name, userName: user.userName, email: user.email });
    setEditingUserId(user._id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl text-center pt-10">CRUD In MERN Stack</h1>
      <div className="mb-6">
        <h2>{editingUserId ? "Update User" : "Create User"}</h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mb-2 ml-2"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-2 mb-2 ml-2"
          value={newUser.userName}
          onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2 ml-2"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button
          className="px-4 py-2 ml-2 bg-lime-500 text-white rounded-md mr-2"
          onClick={editingUserId ? updateUser : createUser}
        >
          {editingUserId ? "Update User" : "Create User"}
        </button>
        {/* Cancel button for editing */}

        {editingUserId && (
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            onClick={() => {
              setEditingUserId(null);
              setNewUser({ name: "", userName: "", email: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Display users using CSS Grid */}
      <h2 className="text-xl ">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border p-4 rounded shadow-lg flex flex-col justify-between"
          >
            <div>
              <h4 className="font-semibold text-md">Name: {user.name}</h4>
              <p className="text-gray-600">Username: {user.userName}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-1.5 bg-blue-700 text-white rounded mr-2"
                onClick={() => editUser(user)}
              >
                Edit
              </button>
              <button
                className="px-4 py-1.5 bg-red-600 text-white rounded"
                onClick={() => {
                  if (window.confirm("Are you sure you want to")) {
                    deleteUser(user._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
