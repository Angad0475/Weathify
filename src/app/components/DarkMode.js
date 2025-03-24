'use client';
import React, { useState, useEffect } from "react";

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            setDarkMode(false);
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="fixed top-6 right-6">
            <input 
                type="checkbox" 
                id="check" 
                className="hidden" 
                checked={darkMode} 
                onChange={() => setDarkMode(!darkMode)} 
            />

            <label 
                htmlFor="check" 
                className="flex items-center gap-3 cursor-pointer text-xl transition-all duration-300"
            >
                {/* Toggle Background */}
                <div 
                    className="relative w-14 h-7 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: "var(--toggle-bg)" }} 
                >
                    {/* Toggle Switch */}
                    <div 
                        className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                            darkMode ? "translate-x-7" : ""
                        }`}
                        style={{ backgroundColor: "var(--toggle-fg)" }}
                    />
                </div>

                {/* Icons */}
                <span className="flex items-center gap-2">
                    <i className='bx bx-moon text-2xl' style={{ color: "var(--primary-text-color)" }}></i>
                    <i className='bx bxs-sun text-2xl' style={{ color: "var(--primary-text-color)" }}></i>
                </span>
            </label>
        </div>
    );
};

export default DarkMode;
