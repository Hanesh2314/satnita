
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

const defaultBulletinInfo: BulletinInfo = {
  text: "Applications are now open for the Student Satellite Program! Last date for receipt of applications: 31.10.2024. Click here to apply now.",
  formLink: "https://forms.google.com/studentsat-application",
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
      // Always attempt to get fresh data by adding a cache buster
      const saved = localStorage.getItem("bulletinInfo");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure we have a lastUpdated field
        return {
          ...parsed,
          lastUpdated: parsed.lastUpdated || Date.now()
        };
      }
      return defaultBulletinInfo;
    } catch (error) {
      console.error("Error parsing bulletin info:", error);
      return defaultBulletinInfo;
    }
  });

  // Add a refresh function to force new bulletin data
  const refreshBulletinInfo = () => {
    try {
      console.log("Refreshing bulletin info...");
      const saved = localStorage.getItem("bulletinInfo");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.text && parsed.formLink) {
            console.log("Found valid bulletin info in localStorage:", parsed);
            setBulletinInfo({
              ...parsed,
              lastUpdated: Date.now() // Update timestamp
            });
          } else {
            console.log("Bulletin info from localStorage is incomplete, using default");
            setBulletinInfo({
              ...defaultBulletinInfo,
              lastUpdated: Date.now()
            });
          }
        } catch (e) {
          console.error("Failed to parse bulletin info:", e);
          setBulletinInfo({
            ...defaultBulletinInfo,
            lastUpdated: Date.now()
          });
        }
      } else {
        console.log("No bulletin info found in localStorage, using default");
        setBulletinInfo({
          ...defaultBulletinInfo,
          lastUpdated: Date.now()
        });
      }
    } catch (error) {
      console.error("Error refreshing bulletin info:", error);
      // Fall back to default in case of any errors
      setBulletinInfo({
        ...defaultBulletinInfo,
        lastUpdated: Date.now()
      });
    }
  };

  // Add an interval to check for bulletin updates
  useEffect(() => {
    const checkInterval = setInterval(() => {
      refreshBulletinInfo();
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(checkInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem("aboutUs", JSON.stringify(aboutUs));
  }, [aboutUs]);
  
  useEffect(() => {
    localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
  }, [contactInfo]);
  
  useEffect(() => {
    // Only save if bulletin info has valid content
    if (bulletinInfo.text && bulletinInfo.formLink) {
      console.log("Saving bulletin info to localStorage:", bulletinInfo);
      localStorage.setItem("bulletinInfo", JSON.stringify(bulletinInfo));
    } else {
      console.warn("Attempted to save empty bulletin info, preserving previous value");
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
    // Validate input to prevent empty announcements
    if (!newBulletinInfo.text || !newBulletinInfo.formLink) {
      console.error("Cannot update with empty bulletin content");
      return;
    }
    
    console.log("Updating bulletin info:", newBulletinInfo);
    setBulletinInfo({
      ...newBulletinInfo,
      lastUpdated: Date.now() // Always update the timestamp
    });
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
