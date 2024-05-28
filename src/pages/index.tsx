import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold mb-4">Welcome to User-Wallet Manager</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/users" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out block text-center">
        
            Manage Users
         
        </Link>
        <Link href="/walletAddresses" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out block text-center">
      
            Manage Wallet Addresses
   
        </Link>
      </div>
    </main>
  );
}
