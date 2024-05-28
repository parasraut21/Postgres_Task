import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", { name, email, password });
      router.push("/users");
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default CreateUser;
