'use client'

import { useState } from "react";

interface Users{
  id: number;
  age: number;
  name: string;
}

export default function Home() {
  const [users, setUsers] = useState<Users[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  async function getUsers(){
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const json = await response.json();
      setUsers(json.services || []);
      console.log({ json });
    } catch (error) {
      console.error(error);
      setUsers([]);
    }
  }

  function addUser() {
    if (name && age) {
      const newUser = {
        id: users.length + 1,  
        name: name,
        age: parseInt(age)
      };

    
    // setUsers([...users, newUser]);  // Add new user to the list

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
      
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}, Age: {user.age}
          </li>
        ))}
      </ul>

      
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

      
      <button onClick={addUser}>Add</button>
    </div>
  );
}
