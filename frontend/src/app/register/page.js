"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Khali field check karne ke liye
    if (!formData.name || !formData.email || !formData.password) {
      alert("Bhai, saari fields bharna zaroori hai! 🛑");
      return;
    }

    // 2. Email format check karne ke liye (Regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert("Sahi Gmail likho bhai! (Example: user@gmail.com) 📧");
      return;
    }

    // 3. Password length check (Optional par accha rehta hai)
    if (formData.password.length < 6) {
      alert("Password kam se kam 6 characters ka hona chahiye! 🔑");
      return;
    }

    try {
      await axios.post("https://internship-auth-backend-jc7x.onrender.com/api/auth/register", formData);
    alert("Account Created Successfully! ✅");
      router.push("/login");
    } catch (err) {
      alert("Registration Failed! Shayad ye email pehle se use ho raha hai. ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Join Us</h2>
        <p className="text-center text-gray-500 mb-8">Create your account to get started</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" placeholder="name@company.com" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition active:scale-95">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <a href="/login" className="text-blue-600 font-semibold hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}