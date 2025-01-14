import React, { useEffect, useState } from 'react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const menuLinks = [
    {
      title: "Vision",
      href: "./src/assets/Rgatt Whitepaper.pdf",
      tooltip: "Read our introduction",
      isExternal: true
    },
    {
      title: "Contact",
      href: "mailto:rgattlabs@gmail.com",
      tooltip: "Get in touch with us",
      isExternal: true
    },
    {
      title: "Jobs",
      tooltip: "Under Construction",
      isDisabled: true,
      isExternal: false
    }
  ];

  const XIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 inline-block ml-2" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0A0A23]">
      <img
        src="./src/assets/smart.jpg"
        alt="Smart Image"
        className="pointer-events-none fixed"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "60px",
          height: "60px",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      />

      <div className="relative z-10 flex w-full">
        <div className="w-1/2 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white tracking-tight">RGATT</h1>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="flex flex-col space-y-8 text-center">
            {menuLinks.map((link, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {link.isDisabled ? (
                  <span className="text-3xl font-light text-white opacity-50 cursor-not-allowed transition-all duration-300 hover:scale-105">
                    {link.title}
                  </span>
                ) : (
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="text-3xl font-light text-white transition-all duration-300 hover:scale-105 hover:text-opacity-80"
                  >
                    {link.title}
                  </a>
                )}
                {activeTooltip === index && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-5 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-white text-sm whitespace-nowrap">
                      {link.tooltip}
                    </span>
                  </div>
                )}
              </div>
            ))}
            
            <div 
              className="relative"
              onMouseEnter={() => setActiveTooltip('x')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <a
                href="https://x.com/rgattlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-light text-white transition-all duration-300 hover:scale-105 hover:text-opacity-80 flex items-center justify-center"
              >
                Follow us on <XIcon />
              </a>
              {activeTooltip === 'x' && (
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-5 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white text-sm whitespace-nowrap">
                    Stay updated on X
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;