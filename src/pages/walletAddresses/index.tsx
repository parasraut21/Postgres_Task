import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const WalletAddressList = () => {
  const [walletAddresses, setWalletAddresses] = useState([]);

  useEffect(() => {
    axios.get("/api/walletAddresses").then((response) => {
      setWalletAddresses(response.data);
    });
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wallet Addresses</h1>
      <Link href="/walletAddresses/create">
        <button className="text-blue-500 hover:text-blue-700 mb-2 block">Create Wallet Address</button>
      </Link>
      <ul>
        {walletAddresses.map((address) => (
          <li key={address.id} className="flex items-center justify-between bg-gray-100 p-4 rounded mb-2">
            <span>{address.address}</span>
            <Link href={`/walletAddresses/${address.id}/edit`} passHref>
              <button className="text-blue-500 hover:text-blue-700">Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletAddressList;
