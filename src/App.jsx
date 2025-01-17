import React, { useEffect, useState } from 'react';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showEmailSelector, setShowEmailSelector] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const emailAddress = "rgattlabs@gmail.com";

  const emailProviders = [
    {
      name: "Gmail",
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`
    },
    {
      name: "Outlook",
      url: `https://outlook.live.com/mail/0/deeplink/compose?to=${emailAddress}`
    },
    {
      name: "Default Email Client",
      url: `mailto:${emailAddress}`
    }
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const menuLinks = [
    {
      title: "Vision",
      href: "./RGATT.pdf",
      tooltip: "Read our introduction",
      isExternal: true
    },
    {
      title: "Contact",
      href: "#",
      tooltip: "Get in touch with us",
      isExternal: false,
      isEmail: true
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

  const handleEmailClick = (provider) => {
    window.open(provider.url, '_blank');
    setShowEmailSelector(false);
  };

  const EmailSelector = () => {
    if (!showEmailSelector) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ cursor: 'none' }}>
        <div className="bg-[#1a1a3a] p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl">Choose your email provider</h2>
            <button 
              onClick={() => setShowEmailSelector(false)}
              className="text-white hover:text-gray-300"
              style={{ cursor: 'none' }}
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            {emailProviders.map((provider, idx) => (
              <button
                key={idx}
                onClick={() => handleEmailClick(provider)}
                className="w-full px-4 py-2 text-white bg-[#2a2a4a] hover:bg-[#3a3a5a] rounded-lg transition-colors"
                style={{ cursor: 'none' }}
              >
                {provider.name}
              </button>
            ))}
            
            <button
              onClick={handleCopyEmail}
              className={`w-full px-4 py-2 text-white rounded-lg transition-all duration-300 ease-in-out ${
                copySuccess 
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#2a2a4a] hover:bg-[#3a3a5a]'
              }`}
              style={{ cursor: 'none' }}
            >
              {copySuccess ? 'Email Copied!' : 'Copy Email Address'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0A0A23]" style={{ cursor: 'none' }}>
      {!imageError && (
        <img
          src="./rgatt-cursor.jpg"
          alt="Cursor Image"
          className="pointer-events-none fixed"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: "120px",
            height: "120px",
            transform: "translate(-50%, -50%)",
            zIndex: 50,
            cursor: 'none'
          }}
          onError={() => {
            console.error('Image failed to load');
            setImageError(true);
          }}
        />
      )}

      <EmailSelector />

      <div className="relative z-10 flex w-full">
        <div className="w-1/2 flex items-center justify-center">
          <img src="./rgatt.png" alt="RGATT" className="h-auto" style={{ cursor: 'none' }} />
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="flex flex-col space-y-8 text-center">
            {menuLinks.map((link, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setActiveTooltip(index)}
                onMouseLeave={() => setActiveTooltip(null)}
                style={{ cursor: 'none' }}
              >
                {link.isDisabled ? (
                  <span className="text-3xl font-light text-white opacity-50 cursor-not-allowed transition-all duration-300 hover:scale-105" style={{ cursor: 'none' }}>
                    {link.title}
                  </span>
                ) : link.isEmail ? (
                  <button
                    onClick={() => setShowEmailSelector(true)}
                    className="text-3xl font-light text-white transition-all duration-300 hover:scale-105 hover:text-opacity-80"
                    style={{ cursor: 'none' }}
                  >
                    {link.title}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="text-3xl font-light text-white transition-all duration-300 hover:scale-105 hover:text-opacity-80"
                    style={{ cursor: 'none' }}
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
              style={{ cursor: 'none' }}
            >
              <a
                href="https://x.com/rgattlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-light text-white transition-all duration-300 hover:scale-105 hover:text-opacity-80 flex items-center justify-center"
                style={{ cursor: 'none' }}
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