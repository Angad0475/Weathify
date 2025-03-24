"use client";
import React from "react";
import { IoClose } from "react-icons/io5"; // Close icon

function Modal1({ cModal1, Wind }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-80 p-6 rounded-2xl shadow-xl text-center transform scale-95 transition-all duration-300 ease-out border-2 border-opacity-50 border-white/30"
        style={{ backgroundColor: "var(--w-color)" }}
      >
        {/* Close Button */}
        <button
          onClick={() => cModal1(false)}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/20 transition-all"
          style={{ backgroundColor: "var(--x-color)", color: "var(--primary-text-color)" }}
        >
          <IoClose className="text-xl" />
        </button>

        {/* Modal Content */}
        <div className="mt-4 space-y-4">
          <h1 className="text-2xl font-semibold" style={{ color: "var(--primary-text-color)" }}>
            Wind Speed
          </h1>
          <p className="text-lg px-4" style={{ color: "var(--primary-text-color)" }}>
            {Wind} Km/H
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal1;
