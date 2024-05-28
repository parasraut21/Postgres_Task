import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const CreateWalletAddress = () => {
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/walletAddresses", { user_id: userId, address });
      router.push("/walletAddresses");
    } catch (error) {
      console.error("Failed to create wallet address", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Wallet Address</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">User</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default CreateWalletAddress;
