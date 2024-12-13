"use client";

import { useEffect, useState } from "react";

interface Users {
  id: number;
  age: number;
  name: string;
}

export default function RemoveUsers() {
  const [users, setUsers] = useState<Users[]>([]);

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

  return (
    <>
    <ul className="space-y-3">
      {users.map((user) => (
        <li key={user.id} className="text-gray-700">
        <div className=" p-4 m-5 bg-sky-600 text-white max-w-[33%] rounded-md shadow-lg">
          {user.name} ( Age: {user.age})
        </div>
        </li>
      ))}
    </ul>
    </>
  );
}
