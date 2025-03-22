
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AboutUs {
  title: string;
  content: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  aboutUs: AboutUs;
  updateAboutUs: (newAboutUs: AboutUs) => void;
}

const defaultAboutUs: AboutUs = {
  title: "Satellite Research Project",
  content: "Our research satellite project aims to develop cutting-edge space technology for Earth observation and scientific research. We're a team of passionate students working to design, build, and eventually launch our own satellite. Join us in this exciting journey to explore the frontiers of space technology and make a meaningful contribution to space science."
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously authenticated
    const saved = localStorage.getItem("adminAuth");
    return saved === "true";
  });
  
  const [aboutUs, setAboutUs] = useState<AboutUs>(() => {
    const saved = localStorage.getItem("aboutUs");
    return saved ? JSON.parse(saved) : defaultAboutUs;
  });

  useEffect(() => {
    localStorage.setItem("aboutUs", JSON.stringify(aboutUs));
  }, [aboutUs]);
  
  useEffect(() => {
    localStorage.setItem("adminAuth", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = (password: string) => {
    if (password === "KLPD") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateAboutUs = (newAboutUs: AboutUs) => {
    setAboutUs(newAboutUs);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        aboutUs,
        updateAboutUs
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
