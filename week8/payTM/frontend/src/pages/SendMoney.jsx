// import React, { useState, useEffect, useRef } from "react";
// import { Send } from "lucide-react";
// import { useDebounce } from "../hooks/useDebounce";

// const SendMoney = ({ user, balance, onTransferComplete, onClose }) => {
//   const [search, setSearch] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const abortControllerRef = useRef(null);

//   const debouncedSearch = useDebounce(search, 300); // 300ms debounce delay

//   useEffect(() => {
//     if (debouncedSearch.length > 0) {
//       handleUserSearch(debouncedSearch);
//     } else {
//       setFilteredUsers([]);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [debouncedSearch]);

//   const handleUserSearch = async (query) => {
//     // Cancel previous request if any
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     // Create new AbortController for current request
//     abortControllerRef.current = new AbortController();
//     const token = localStorage.getItem("token");

//     try {
//       setIsSearching(true);
//       const res = await fetch(
//         `http://localhost:3000/api/v1/user/bulk?filter=${query}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           signal: abortControllerRef.current.signal
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setFilteredUsers(data.user.filter((u) => u._id !== user._id));
//       }
//     } catch (error) {
//       if (error.name !== 'AbortError') {
//         console.error("User search failed:", error);
//       }
//     } finally {
//       setIsSearching(false);
//       abortControllerRef.current = null;
//     }
//   };

//   // Cleanup pending requests when component unmounts
//   useEffect(() => {
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     };
//   }, []);

//   const handleTransfer = async () => {
//     if (!validateTransfer()) return;

//     setIsLoading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch("http://localhost:3000/api/v1/account/transfer", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           to: selectedUser._id,
//           amount: parseFloat(amount)
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Transfer Successful!");
//         onTransferComplete(parseFloat(amount));
//       } else {
//         throw new Error(data.message || 'Transfer failed');
//       }
//     } catch (err) {
//       alert(`❌ ${err.message}`);
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validateTransfer = () => {
//     if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
//       alert("Please enter a valid amount");
//       return false;
//     }

//     if (parseFloat(amount) > parseFloat(balance)) {
//       alert("Insufficient balance");
//       return false;
//     }

//     if (!selectedUser) {
//       alert("Please select a user to send money to");
//       return false;
//     }

//     return true;
//   };

//   return (
//     <div className="bg-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-md border border-white/10">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Send Money</h3>
//         <button
//           onClick={onClose}
//           className="text-white/50 hover:text-white"
//           disabled={isLoading}
//         >
//           ✕
//         </button>
//       </div>

//       <div className="mb-4 relative">
//         <input
//           type="text"
//           placeholder="Search user..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20"
//           disabled={isLoading}
//         />
//         {isSearching && (
//           <div className="absolute right-3 top-2.5">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//           </div>
//         )}
//       </div>

//       <div className="max-h-40 overflow-y-auto mb-4">
//         {filteredUsers.length > 0 ? (
//           filteredUsers.map((u) => (
//             <div
//               key={u._id}
//               className={`px-4 py-2 rounded-md cursor-pointer hover:bg-white/10 ${
//                 selectedUser?._id === u._id ? "bg-white/10 border border-white/20" : ""
//               }`}
//               onClick={() => !isLoading && setSelectedUser(u)}
//             >
//               {u.firstName} {u.lastName} ({u.username})
//             </div>
//           ))
//         ) : search && !isSearching ? (
//           <div className="px-4 py-2 text-white/50">No users found</div>
//         ) : null}
//       </div>

//       {selectedUser && (
//         <div className="mt-4 space-y-3">
//           <input
//             type="number"
//             placeholder="Enter amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20"
//             disabled={isLoading}
//           />
//           <button
//             onClick={handleTransfer}
//             disabled={isLoading}
//             className={`w-full py-2 rounded-md text-white font-semibold flex items-center justify-center gap-2 ${
//               isLoading ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             {isLoading ? (
//               "Processing..."
//             ) : (
//               <>
//                 <Send size={16} />
//                 Send ₹{amount} to {selectedUser.firstName}
//               </>
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SendMoney;

import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

const SendMoney = ({ user, balance, onTransferComplete, onClose }) => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const abortControllerRef = useRef(null);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch.trim()) handleUserSearch(debouncedSearch);
    else setFilteredUsers([]);
  }, [debouncedSearch]);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const handleUserSearch = async (query) => {
    abortControllerRef.current?.abort(); // cancel prev
    abortControllerRef.current = new AbortController();
    const token = localStorage.getItem("token");

    try {
      setIsSearching(true);
      const res = await fetch(
        `http://localhost:3000/api/v1/user/bulk?filter=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: abortControllerRef.current.signal,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setFilteredUsers(data.user.filter((u) => u._id !== user._id));
      }
    } catch (err) {
      if (err.name !== "AbortError") console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const validateTransfer = () => {
    const amt = parseFloat(amount);
    if (!selectedUser) return alert("Select a user first");
    if (!amt || amt <= 0) return alert("Enter a valid amount");
    if (amt > parseFloat(balance)) return alert("Insufficient balance");
    return true;
  };

  const handleTransfer = async () => {
    if (!validateTransfer()) return;

    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/v1/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: selectedUser._id,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Transfer Successful!");
        onTransferComplete(parseFloat(amount));
      } else {
        throw new Error(data.message || "Transfer failed");
      }
    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && selectedUser) {
      handleTransfer();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-md border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Send Money</h3>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white"
          disabled={isLoading}
        >
          ✕
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20"
          disabled={isLoading}
        />
        {isSearching && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></div>
          </div>
        )}
      </div>

      <div className="max-h-40 overflow-y-auto mb-4">
        {filteredUsers.length > 0
          ? filteredUsers.map((u) => (
              <div
                key={u._id}
                className={`px-4 py-2 rounded-md cursor-pointer hover:bg-white/10 ${
                  selectedUser?._id === u._id
                    ? "bg-white/10 border border-white/20"
                    : ""
                }`}
                onClick={() => !isLoading && setSelectedUser(u)}
              >
                {u.firstName} {u.lastName} ({u.username})
              </div>
            ))
          : search &&
            !isSearching && (
              <div className="px-4 py-2 text-white/50">No users found</div>
            )}
      </div>

      {selectedUser && (
        <div className="mt-4 space-y-3">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20"
            disabled={isLoading}
          />
          <button
            onClick={handleTransfer}
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white font-semibold flex items-center justify-center gap-2 ${
              isLoading ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Send size={16} />
                Send ₹{amount} to {selectedUser.firstName}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
