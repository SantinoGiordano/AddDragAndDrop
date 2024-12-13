'use client'

import { useState } from "react";

interface Users {
    id: number;
    name: string;
    age: Number;
  }

export default function AddButton() {

    const [users, setUsers] = useState<Users[]>([])
    

  function addUser() {
    const newUser = {
      id: users.length + 1,
      name: `New User ${users.length + 1}`,  
      age: Math.floor(Math.random() * 50) + 20  
    };

    setUsers([...users, newUser]);

  return (
        <div>
        <h1>Users List</h1>
        <ul>
            {users.map((user) => (
            <li key={user.id}>
                {user.name} (ID: {user.id}, Age: {user.age})
            </li>
            ))}
        </ul>
        <button onClick={addUser}>Add</button>
        </div>
    );
  }
}
