
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

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

interface BulletinInfo {
  text: string;
  formLink: string;
  lastUpdated?: number; // Add timestamp for cache busting
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  aboutUs: AboutUs;
  updateAboutUs: (newAboutUs: AboutUs) => void;
  contactInfo: ContactInfo;
  updateContactInfo: (newContactInfo: ContactInfo) => void;
  bulletinInfo: BulletinInfo;
  updateBulletinInfo: (newBulletinInfo: BulletinInfo) => void;
  refreshBulletinInfo: () => void;
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

// Set the default bulletin info with the specified content and link
const defaultBulletinInfo: BulletinInfo = {
  text: "Applications are now open . click here",
  formLink: "https://docs.google.com/forms/d/e/1FAIpQLScoTPloDuYsuSId-j6OVgHTRFSsN6eF2Y6O2RUvQL_O7CHlBA/viewform?usp=header",
  lastUpdated: Date.now()
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
  
  const [bulletinInfo, setBulletinInfo] = useState<BulletinInfo>(() => {
    try {
      // Clear any existing bulletin info to ensure we use the new default
      localStorage.removeItem("bulletinInfo");
      return defaultBulletinInfo;
    } catch (error) {
      console.error("Error initializing bulletin info:", error);
      return defaultBulletinInfo;
    }
  });

  // Simplify refresh function to always use valid data
  const refreshBulletinInfo = useCallback(() => {
    try {
      console.log("Refreshing bulletin info...");
      const saved = localStorage.getItem("bulletinInfo");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.text && parsed.formLink) {
            console.log("Found valid bulletin info in localStorage:", parsed);
            setBulletinInfo({
              text: parsed.text,
              formLink: parsed.formLink,
              lastUpdated: Date.now()
            });
            return;
          }
        } catch (e) {
          console.error("Failed to parse bulletin info:", e);
        }
      }
      
      // If we reach here, set the default values
      setBulletinInfo({
        ...defaultBulletinInfo,
        lastUpdated: Date.now()
      });
    } catch (error) {
      console.error("Error refreshing bulletin info:", error);
      setBulletinInfo({
        ...defaultBulletinInfo,
        lastUpdated: Date.now()
      });
    }
  }, []);

  // Initialize bulletin info on mount
  useEffect(() => {
    refreshBulletinInfo();
  }, [refreshBulletinInfo]);

  useEffect(() => {
    localStorage.setItem("aboutUs", JSON.stringify(aboutUs));
  }, [aboutUs]);
  
  useEffect(() => {
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
  }, [contactInfo]);
  
  useEffect(() => {
    // Ensure bulletin info is always valid
    if (bulletinInfo.text && bulletinInfo.formLink) {
      console.log("Saving bulletin info to localStorage:", bulletinInfo);
      localStorage.setItem("bulletinInfo", JSON.stringify({
        text: bulletinInfo.text,
        formLink: bulletinInfo.formLink,
        lastUpdated: Date.now() // Always use current timestamp
      }));
    } else {
      // If invalid, restore defaults
      localStorage.setItem("bulletinInfo", JSON.stringify(defaultBulletinInfo));
    }
  }, [bulletinInfo]);
  
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
  
  const updateBulletinInfo = (newBulletinInfo: BulletinInfo) => {
    // Ensure we never save empty content
    if (!newBulletinInfo.text || !newBulletinInfo.formLink) {
      console.error("Cannot update with empty bulletin content");
      return;
    }
    
    console.log("Updating bulletin info:", newBulletinInfo);
    setBulletinInfo({
      text: newBulletinInfo.text,
      formLink: newBulletinInfo.formLink,
      lastUpdated: Date.now()
    });
    
    // Explicitly save to localStorage right away
    localStorage.setItem("bulletinInfo", JSON.stringify({
      text: newBulletinInfo.text,
      formLink: newBulletinInfo.formLink,
      lastUpdated: Date.now()
    }));
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
        updateContactInfo,
        bulletinInfo,
        updateBulletinInfo,
        refreshBulletinInfo
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
