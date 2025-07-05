import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Wallet, User } from "lucide-react";

function DashBoard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
      fetchBalance(token);
    }
  }, []);

  const fetchBalance = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBalance(data.balance.toFixed(2));
      } else {
        console.error(data.message || "Failed to fetch balance");
      }
    } catch (err) {
      console.error("Balance fetch error:", err);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col px-4 py-12 text-white font-sans">
      {/* Top Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-12">
        <div className="text-xl font-bold tracking-wide text-white/60">
          Dashboard
        </div>

        <h3 className="text-4xl sm:text-5xl font-extrabold text-center text-white drop-shadow-lg">
          PayMate 💸
        </h3>

        {!isLoggedIn ? (
          <div className="flex gap-3">
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-sm font-medium shadow-md"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-full text-sm font-medium shadow-md"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm font-medium shadow-md"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/signin");
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>

      {/* Dashboard Content */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        {user && (
          <div className="bg-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-md border border-white/10 flex items-center gap-4 hover:shadow-lg transition">
            <User className="text-white" size={28} />
            <div>
              <div className="text-lg font-semibold">
                Welcome, {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-white/70">{user.username}</div>
            </div>
          </div>
        )}

        {balance !== null && (
          <div className="bg-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-md border border-white/10 flex justify-between items-center gap-6 hover:shadow-lg transition">
            {/* Left: Wallet + Balance Info */}
            <div className="flex items-center gap-3">
              <Wallet className="text-green-400" size={28} />
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-green-300">
                  Balance: ₹{balance}
                </div>
                <div className="text-sm text-white/60">Available Balance</div>
              </div>
            </div>

            {/* Right: Send Money Button */}
            <button
              onClick={() => setShowTransfer(true)}
              className="bg-[#12677E] hover:bg-[#0f5e73] text-white text-sm px-4 py-2 rounded-lg font-medium transition"
            >
              Send Money
            </button>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-md border border-white/10 hover:shadow-lg transition">
          <div className="text-xl font-semibold mb-2">Users List</div>
          <div className="text-white/70 text-sm">Coming soon...</div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
