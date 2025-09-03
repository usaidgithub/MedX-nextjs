import { useState } from "react";
import { Heart, Menu, PhoneCall, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [showEmergency, setShowEmergency] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  const handleNavClick = () => {
    setShowEmergency(false);
    setShowMobileMenu(false);
  };

  const buttonClassNames = {
    emergency: "rounded-full bg-red-500 hover:bg-red-600 px-6 py-2.5 text-base text-white font-bold shadow-md flex items-center gap-2 transition-all",
    login: "rounded-full bg-medical-primary hover:bg-blue-700 px-8 py-2.5 text-base text-grey-800 font-bold shadow-md transition-all",
    mobileEmergency: "w-full rounded-full bg-red-500 hover:bg-red-600 px-6 py-3 text-lg text-white font-bold shadow-md flex items-center justify-center gap-2",
    mobileLogin: "w-full rounded-full bg-medical-primary hover:bg-blue-700 px-8 py-3 text-lg text-black font-bold shadow-md",
    mobileMenu: "md:hidden text-gray-700 hover:bg-gray-100 rounded-full",
    desktopNav: "relative text-lg lg:text-xl font-medium transition-colors duration-300 group"
  };

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Schemes", path: "/schemes" },
    { name: "MedStore", path: "/pharmacy" },
    { name: "Donation", path: "/donation" },
    { name: "Appointments", path: "/userappoint" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={handleNavClick} className="flex items-center space-x-3 cursor-pointer select-none">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-medical-primary rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-6">
              {/* Changed heart color to text-blue-500 for visibility */}
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-blue-500" /> 
            </div>
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-medical-primary">
              Cura<span className="text-gray-800">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`${buttonClassNames.desktopNav} ${
                  router.pathname === item.path
                    ? "text-medical-primary"
                    : "text-gray-600 hover:text-medical-primary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-medical-primary transition-all duration-300 group-hover:w-full ${
                    router.pathname === item.path ? "w-full" : "w-0"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* CTA Section (Emergency + Login) */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {/* Emergency Button */}
            <div className="relative">
              <button
                onClick={() => setShowEmergency(!showEmergency)}
                className={buttonClassNames.emergency}
              >
                <PhoneCall className="w-4 h-4" />
                Emergency
              </button>
              {showEmergency && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 p-2 space-y-1 z-50 animate-fade-in-down">
                  <a
                    href="tel:102"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-red-50 text-gray-800 font-medium transition-colors"
                  >
                    🚑 Ambulance — 102
                  </a>
                  <a
                    href="tel:100"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-red-50 text-gray-800 font-medium transition-colors"
                  >
                    🚓 Police — 100
                  </a>
                  <a
                    href="tel:101"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-red-50 text-gray-800 font-medium transition-colors"
                  >
                    🚒 Fire — 101
                  </a>
                </div>
              )}
            </div>
            {/* Login Button */}
            <Link href="/profile" className={buttonClassNames.login}>
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${buttonClassNames.mobileMenu} p-2`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu (Conditionally Rendered) */}
      <div
        className={`md:hidden fixed inset-0 top-[80px] bg-white transition-transform duration-300 ease-in-out z-40 transform ${
          showMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 pt-8 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={handleNavClick}
              className={`text-2xl font-semibold transition-colors duration-300 ${
                router.pathname === item.path
                  ? "text-medical-primary"
                  : "text-gray-700 hover:text-medical-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col items-center space-y-4 pt-4 w-full px-6">
            <div className="w-full relative">
              <button
                onClick={() => setShowEmergency(!showEmergency)}
                className={buttonClassNames.mobileEmergency}
              >
                <PhoneCall className="w-5 h-5" />
                Emergency
              </button>
              {showEmergency && (
                <div className="absolute left-0 right-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 p-2 space-y-1 z-50">
                  <a
                    href="tel:102"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-red-50 text-gray-800 font-medium transition-colors"
                  >
                    🚑 Ambulance — 102
                  </a>
                  <a
                    href="tel:100"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-red-50 text-gray-800 font-medium transition-colors"
                  >
                    🚓 Police — 100
                  </a>
                  <a
                    href="tel:101"
                    className="flex items-center px-3 py-2 rounded-md hover:bg-red-50 text-gray-800 font-medium transition-colors"
                  >
                    🚒 Fire — 101
                  </a>
                </div>
              )}
            </div>
            <Link href="/login" onClick={handleNavClick} className={buttonClassNames.mobileLogin}>
              Sign up / Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;