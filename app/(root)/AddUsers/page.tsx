"use client";

import { useEffect, useState } from "react";

interface Users {
  id: number;
  age: number;
  name: string;
}

export default function AddUser() {
  const [users, setUsers] = useState<Users[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  async function getUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const json = await response.json();
      setUsers(json.users || []);
      console.log({ json });
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  }

  useEffect(() => {
    getUsers();
    console.log("Users after fetch:", users);
  }, []);

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
      console.log(newUser);
    } else {
      alert("Please provide both name and age.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6 transform transition-transform hover:scale-105">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Add New User</h2>

        {/* Display the users list */}
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="text-gray-700">
              {user.name} ( Age: {user.age})
            </li>
          ))}
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

        {/* Add Button */}
        <button
          onClick={addUser}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        >
          Add User
        </button>
      </div>
    </div>
  );
}