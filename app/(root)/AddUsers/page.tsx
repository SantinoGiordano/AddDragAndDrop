"use client";

import { useEffect, useState } from "react";
import Toast from "@/app/componets/Toast";
import { button } from "framer-motion/client";

interface Users {
  id: number;
  age: number;
  name: string;
}

export default function AddUser() {
  const [users, setUsers] = useState<Users[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch users from API
  async function getUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/usersAdd");
      const json = await response.json();
      setUsers(json.users || []);
    } catch (error) {
      console.error(error);
      setUsers([]);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  }

  // Fetch users when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  // Add new user to the list
  function addUser() {
    if (name && age) {
      const newUser = {
        id: users.length + 1,
        name: name,
        age: parseInt(age),
      };
      setUsers([...users, newUser]);
      setName("");
      setAge("");
      setToastVisible(true);

      // Hide the toast after 3 seconds
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    } else {
      alert("Please provide both name and age.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6 transform transition-transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add New User
        </h2>

        {/* Display users list or loading spinner */}
        <ul className="space-y-3">
          {loading ? (
            // Show the spinner while loading
            <li className="text-left p-10 text-xl flex justify-center items-center">
              <span className="loading loading-spinner loading-lg"></span>
            </li>
          ) : (
            // Show the user list when data is fetched
            users.map((user) => (
              <li key={user.id} className="text-gray-700">
                {user.name} (Age: {user.age})
              </li>
            ))
          )}
        </ul>

        {/* Input fields for name and age */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
        onClick={addUser}
        className=" w-full btn btn-outline btn-success"
        >
        Add
        </button>
      </div>

      {/* Toast Notification */}
      {toastVisible && <Toast message={"User Added"} />}
    </div>
  );
}
