
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Rocket, Menu, X, Shield } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/30 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between md:justify-start">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white transition-transform hover:scale-105"
          >
            <img 
              src="/lovable-uploads/2a2d317d-1e3e-4404-90d2-0ae15b71193a.png" 
              alt="Kshitiz Logo" 
              className="w-8 h-8" 
            />
            <span className="text-xl font-bold tracking-tight">Kshitiz</span>
          </Link>
          
          <div className="hidden md:flex items-center justify-center space-x-8 mx-auto">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-all duration-300 hover:text-space-accent ${
                location.pathname === "/" ? "text-space-accent" : "text-white/80"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/departments" 
              className={`text-sm font-medium transition-all duration-300 hover:text-space-accent ${
                location.pathname === "/departments" ? "text-space-accent" : "text-white/80"
              }`}
            >
              Subsystems
            </Link>
            <Link 
              to="/admin" 
              className={`text-sm font-medium flex items-center transition-all duration-300 hover:text-space-accent ${
                location.pathname === "/admin" ? "text-space-accent" : "text-white/80"
              }`}
            >
              <Shield size={14} className="mr-1" />
              Admin
            </Link>
            {isAuthenticated && (
              <button 
                onClick={logout}
                className="text-sm font-medium text-red-400 transition-all duration-300 hover:text-red-300"
              >
                Logout
              </button>
            )}
          </div>
          
          <button 
            className="md:hidden text-white focus:outline-none ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-space-dark/90 backdrop-blur-lg shadow-lg animate-fade-in">
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/" 
              className={`block text-sm font-medium ${
                location.pathname === "/" ? "text-space-accent" : "text-white/80"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/departments" 
              className={`block text-sm font-medium ${
                location.pathname === "/departments" ? "text-space-accent" : "text-white/80"
              }`}
            >
              Subsystems
            </Link>
            <Link 
              to="/admin" 
              className={`block text-sm font-medium flex items-center ${
                location.pathname === "/admin" ? "text-space-accent" : "text-white/80"
              }`}
            >
              <Shield size={14} className="mr-1" />
              Admin
            </Link>
            {isAuthenticated && (
              <button 
                onClick={logout}
                className="block w-full text-left text-sm font-medium text-red-400"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
