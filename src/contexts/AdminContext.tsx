
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AboutUs {
  title: string;
  content: string;
}

interface ContactInfo {
  contact1: {
    name: string;
    phone: string;
    email: string;
  };
  contact2: {
    name: string;
    phone: string;
    email: string;
  };
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  aboutUs: AboutUs;
  updateAboutUs: (newAboutUs: AboutUs) => void;
  contactInfo: ContactInfo;
  updateContactInfo: (newContactInfo: ContactInfo) => void;
}

const defaultAboutUs: AboutUs = {
  title: "Student Satellite Program",
  content: "Our student satellite project brings together passionate engineering students to build a fully functional nanosatellite. We're focused on environmental monitoring through cutting-edge technology while providing hands-on experience in space systems engineering."
};

const defaultContactInfo: ContactInfo = {
  contact1: {
    name: "Yashasvi Kumar",
    phone: "9142316400",
    email: "ykuo2021@gmail.com"
  },
  contact2: {
    name: "Hanesh Sharma",
    phone: "7876135821",
    email: "haneshsharma23@gmail.com"
  }
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

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem("contactInfo");
    return saved ? JSON.parse(saved) : defaultContactInfo;
  });

  useEffect(() => {
    localStorage.setItem("aboutUs", JSON.stringify(aboutUs));
  }, [aboutUs]);
  
  useEffect(() => {
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
  }, [contactInfo]);
  
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

  const updateContactInfo = (newContactInfo: ContactInfo) => {
    setContactInfo(newContactInfo);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        aboutUs,
        updateAboutUs,
        contactInfo,
        updateContactInfo
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
