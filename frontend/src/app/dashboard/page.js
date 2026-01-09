"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedName = localStorage.getItem("userName");
    
    if (!token) {
      router.push("/login");
    } else {
      setName(savedName || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight">INTERN<span className="text-gray-800">FLOW</span></h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold transition-all border border-red-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          {/* Left Side: Illustration or Color Block */}
          <div className="md:w-1/3 bg-blue-600 p-12 flex flex-col justify-center items-center text-white text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
              <span className="text-4xl">👋</span>
            </div>
            <h2 className="text-xl font-bold italic opacity-80">Welcome Back!</h2>
          </div>

          {/* Right Side: Content */}
          <div className="md:w-2/3 p-12 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">User Dashboard</h3>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{name}</span>!
            </h1>
           
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-400 font-bold uppercase">Status</p>
                <p className="text-green-600 font-bold">Active Now</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-400 font-bold uppercase">Verified</p>
                <p className="text-blue-600 font-bold">Database Connected</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        Built with ❤️ using Next.js & Node.js
      </footer>
    </div>
  );
}