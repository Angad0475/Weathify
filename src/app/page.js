'use client';

import React, { lazy, Suspense, useState, useEffect } from "react";

// Lazy load the components
const DarkMode = lazy(() => import("@/app/components/DarkMode"));
const WeatherApp = lazy(() => import("@/app/components/Weather"));

export default function Home() {
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000); // 5-second timeout

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Define loading screen
  const loadingScreen = (
    <div className="relative top-[35em] flex justify-center items-center z-[9999]">
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-gray-500 opacity-0 animate-fade delay-0"></div>
        <div className="w-5 h-5 bg-gray-500 opacity-0 animate-fade delay-200"></div>
        <div className="w-5 h-5 bg-gray-500 opacity-0 animate-fade delay-400"></div>
      </div>
    </div>
  );

  return (
    <>
      <Suspense fallback={loadingScreen}>
        <DarkMode />
      </Suspense>

      <Suspense fallback={loadingScreen}>
        {timeoutReached ? <WeatherApp /> : loadingScreen}
      </Suspense>
    </>
  );
}