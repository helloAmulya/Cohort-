import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const captureRef = useRef(null);
  const overlayRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/v1/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    // if (res.ok) {
    //   localStorage.setItem("token", data.token);
    //   navigate("/dashboard");
    // } else {
    //   alert(data.message || "Signin failed");
    // }
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // 🟢 Add this
      navigate("/dashboard");
    }
  };

  // useEffect(() => {
  //   const capture = captureRef.current;
  //   const overlay = overlayRef.current;
  //   if (!capture || !overlay) return;

  //   // Prevent duplicate clones
  //   if (overlay.childNodes.length === 0) {
  //     const cloned = capture.children[0].cloneNode(true);
  //     overlay.appendChild(cloned);
  //   }

  //   const handleMouseMove = (e) => {
  //     const rect = capture.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;

  //     overlay.style.setProperty("--glow-x", `${x}px`);
  //     overlay.style.setProperty("--glow-y", `${y}px`);
  //     overlay.style.setProperty("--glow-opacity", `1`);
  //   };

  //   const handleMouseLeave = () => {
  //     overlay.style.setProperty("--glow-opacity", `0`);
  //   };

  //   capture.addEventListener("mousemove", handleMouseMove);
  //   capture.addEventListener("mouseleave", handleMouseLeave);

  //   return () => {
  //     capture.removeEventListener("mousemove", handleMouseMove);
  //     capture.removeEventListener("mouseleave", handleMouseLeave);
  //   };
  // }, []);

  useEffect(() => {
    const capture = captureRef.current;
    const overlay = overlayRef.current;
    if (!capture || !overlay) return;

    // Prevent duplicate clones
    if (overlay.childNodes.length === 0) {
      // const cloned = capture.children[0].cloneNode(true);
      // overlay.appendChild(cloned);
      const cloned = capture.children[0].cloneNode(true);

      // 🔴 Remove all `id` attributes from cloned inputs and labels
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

      // Only show glow if no input is focused
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
      // Only restore glow on blur if mouse is over the element
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
            Sign In
          </h2>

          <div className="flex items-center gap-4 w-full">
            <label
              htmlFor="signin-username"
              className="min-w-[80px] text-sm text-gray-300"
            >
              Email:
            </label>
            <input
              id="signin-username"
              name="username"
              placeholder="yourmail@example.com"
              onChange={handleChange}
              className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-600 focus:border-[#12677E] text-white placeholder-gray-400 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-4 w-full">
            <label
              htmlFor="signin-password"
              className="min-w-[80px] text-sm text-gray-300"
            >
              Password:
            </label>
            <input
              id="signin-password"
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
            Sign In
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

  // return (
  //   <div className="bg-[#101010] min-h-screen flex items-center justify-center px-4 py-12">
  //     <div
  //       className="w-full max-w-md text-white relative glow-capture"
  //       ref={captureRef}
  //     >
  //       <form
  //         onSubmit={handleSubmit}
  //         className="w-full flex flex-col gap-6 bg-[#171717] border border-white/10 rounded-2xl px-6 py-8 shadow-lg backdrop-blur-md"
  //       >
  //         <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
  //           Sign In
  //         </h2>

  //         <div className="flex items-center gap-4 w-full">
  //           <label
  //             htmlFor="username"
  //             className="min-w-[80px] text-sm text-gray-300"
  //           >
  //             Email:
  //           </label>
  //           <input
  //             id="signin-username"
  //             name="username"
  //             placeholder="yourmail@example.com"
  //             onChange={handleChange}
  //             className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-600 focus:border-[#12677E] text-white placeholder-gray-400 outline-none transition"
  //           />
  //         </div>

  //         <div className="flex items-center gap-4 w-full">
  //           <label
  //             htmlFor="password-signin"
  //             className="min-w-[80px] text-sm text-gray-300"
  //           >
  //             Password:
  //           </label>
  //           <input
  //             id="password-signin"
  //             name="password"
  //             type="password"
  //             placeholder="security key"
  //             onChange={handleChange}
  //             className="flex-1 px-3 py-2 text-sm bg-transparent border-b border-gray-600 focus:border-[#12677E] text-white placeholder-gray-400 outline-none transition"
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           className="w-full sm:w-auto self-center bg-white text-black text-sm font-medium px-6 py-2 rounded-full hover:bg-gray-200 transition"
  //         >
  //           Sign In
  //         </button>
  //       </form>

  //       <div
  //         className="glow-overlay"
  //         ref={overlayRef}
  //         style={{ ["--glow-color"]: "#12677E" }}
  //       />
  //     </div>
  //   </div>
  // );
};

export default Signin;
