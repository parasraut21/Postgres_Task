import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Link href="/users/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">Create User</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border border-gray-200 rounded p-4 mb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">{user.name}</span> - {user.email}
              </div>
              <div>
                <Link href={`/users/${user.id}/edit`}>
                  <button className="text-blue-500 hover:text-blue-700">Edit</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
