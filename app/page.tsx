'use client'

import { useState } from "react";

export default function Home() {
  // Initial users list
  const [users, setUsers] = useState<Users[]>([]);

  // State to track the input values
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Function to handle adding a new user
  function addUser() {
    if (name && age) {
      const newUser = {
        id: users.length + 1,  // Generate the new user ID
        name: name,
        age: parseInt(age) // Convert the age to a number
      };

      setUsers([...users, newUser]);  // Add new user to the list

      // Clear input fields after adding user
      setName("");
      setAge("");
    } else {
      alert("Please provide both name and age.");
    }
  }

  return (
    <div>
      <h1>Users List</h1>
      
      {/* Display the users list */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (ID: {user.id}, Age: {user.age})
          </li>
        ))}
      </ul>

      {/* Input fields for name and age */}
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      {/* Button to add the new user */}
      <button onClick={addUser}>Add</button>
    </div>
  );
}
