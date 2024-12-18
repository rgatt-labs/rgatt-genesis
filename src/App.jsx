import React, { useEffect, useState } from 'react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Update the mouse position on mouse move
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0A0A23]">
      {/* Display the image at the mouse position */}
      <img
        src="./src/assets/smart.jpg" // Replace this with the actual path to your image
        alt="Smart Image"
        className="pointer-events-none fixed"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "60px", // You can adjust the size of the image
          height: "60px", // You can adjust the size of the image
          transform: "translate(-50%, -50%)", // Keep the image centered on the cursor
          zIndex: 10, // Make sure the image is on top
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex w-full">
        {/* Left Section */}
        <div className="w-1/2 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white tracking-tight">RGATT</h1>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="flex flex-col space-y-8 text-center">
            <a
              href="./src/assets/Rgatt Whitepaper.pdf" 
              target="_blank"
              className="text-3xl font-light text-white transition-transform duration-300 hover:scale-105"
            >
              Discover
            </a>
            {/* Contact link with mailto */}
            <a
              href="mailto:rgattlabs@gmail.com"
              className="text-3xl font-light text-white transition-transform duration-300 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>

            {/* Jobs link pointing to the Notion page, opened in a new tab */}
            <a
              href="./src/assets/rgatt Career ee3e825b78074237ac561acedc6a2d9b.html"
              target="_blank"
              className="text-3xl font-light text-white transition-transform duration-300 hover:scale-105"
            >
              Jobs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
