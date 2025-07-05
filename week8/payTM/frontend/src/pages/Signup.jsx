import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const captureRef = useRef(null);
  const overlayRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/v1/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.msg || "Signup failed");
    }
  };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await fetch("http://localhost:3000/api/v1/user/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.msg || "Signup failed");
//       return;
//     }

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));

//     navigate("/dashboard");
//   } catch (err) {
//     console.error("Signup error:", err);
//     alert("Something went wrong!");
//   }
// };


  useEffect(() => {
    const capture = captureRef.current;
    const overlay = overlayRef.current;
    if (!capture || !overlay) return;

    if (overlay.childNodes.length === 0) {
      // const cloned = capture.children[0].cloneNode(true);
      // overlay.appendChild(cloned);
      const cloned = capture.children[0].cloneNode(true);

      cloned.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));

      overlay.innerHTML = "";
      overlay.appendChild(cloned);
    }

    const handleMouseMove = (e) => {
      const rect = capture.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      overlay.style.setProperty("--glow-x", `${x}px`);
      overlay.style.setProperty("--glow-y", `${y}px`);

      if (document.activeElement.tagName !== "INPUT") {
        overlay.style.setProperty("--glow-opacity", `1`);
      }
    };

    const handleMouseLeave = () => {
      overlay.style.setProperty("--glow-opacity", `0`);
    };

    const handleFocusIn = () => {
      overlay.style.setProperty("--glow-opacity", `0`);
    };

    const handleFocusOut = () => {
      if (capture.matches(":hover")) {
        overlay.style.setProperty("--glow-opacity", `1`);
      }
    };

    capture.addEventListener("mousemove", handleMouseMove);
    capture.addEventListener("mouseleave", handleMouseLeave);
    capture.addEventListener("focusin", handleFocusIn);
    capture.addEventListener("focusout", handleFocusOut);

    return () => {
      capture.removeEventListener("mousemove", handleMouseMove);
      capture.removeEventListener("mouseleave", handleMouseLeave);
      capture.removeEventListener("focusin", handleFocusIn);
      capture.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <div className="bg-[#101010] min-h-screen flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md text-white relative glow-capture"
        ref={captureRef}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 bg-[#171717] border border-white/10 rounded-2xl px-6 py-8 shadow-lg backdrop-blur-md"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
            Sign Up
          </h2>

          <div className="flex items-center gap-4 w-full">
            <label
              htmlFor="signup-firstName"
              className="min-w-[80px] text-sm text-gray-300"
            >
              First Name:
            </label>
            <input
              id="signup-firstName"
              name="firstName"
              placeholder="John"
              onChange={handleChange}
              className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-600 focus:border-[#12677E] text-white placeholder-gray-400 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-4 w-full">
            <label
              htmlFor="signup-lastName"
              className="min-w-[80px] text-sm text-gray-300"
            >
              Last Name:
            </label>
            <input
              id="signup-lastName"
              name="lastName"
              placeholder="Doe"
              onChange={handleChange}
              className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-600 focus:border-[#12677E] text-white placeholder-gray-400 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-4 w-full">
            <label
              htmlFor="signup-username"
              className="min-w-[80px] text-sm text-gray-300"
            >
              Email:
            </label>
            <input
              id="signup-username"
              name="username"
              placeholder="yourmail@example.com"
              onChange={handleChange}
              className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-600 focus:border-[#12677E] text-white placeholder-gray-400 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-4 w-full">
            <label
              htmlFor="signup-password"
              className="min-w-[80px] text-sm text-gray-300"
            >
              Password:
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="security key"
              onChange={handleChange}
              className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-600 focus:border-[#12677E] text-white placeholder-gray-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto self-center bg-white text-black text-sm font-medium px-6 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Sign Up
          </button>
        </form>

        <div
          className="glow-overlay"
          ref={overlayRef}
          style={{ ["--glow-color"]: "#12677E" }}
        />
      </div>
    </div>
  );
};

export default Signup;
