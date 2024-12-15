'use client'
import { useEffect, useState } from "react"
interface Users {
    id: number;
    age: number;
    name: string;
  }
export default function Home() {
    const [users, setUsers] = useState<Users>([]);

    // Function to fetch users from the API
    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            if (!res.ok) {
                throw new Error('Failed to fetch users');
            }
            const usersData = await res.json();
            setUsers(usersData);  // Update the state with the fetched users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Fetch users once on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Log the users when the state is updated
    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div>
            <h1>Hello</h1>
            <ul>
                {users.length > 0 ? (
                    users.map((user, index) => <li key={index}>{user.name}</li>)  // Assuming each user has a 'name' field
                ) : (
                    <li>No users found</li>
                )}
            </ul>
        </div>
    )
}
