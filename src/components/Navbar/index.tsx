import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center bg-black text-white p-4 fixed top-0 left-0 right-0 shadow-md border-b border-white">
      <div className="text-xl md:text-2xl font-bold">Articulate AI</div>
      <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
