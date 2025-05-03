
import { useNavigate } from "react-router-dom";
import { ArrowRight, Orbit, Link } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAdmin } from "../contexts/AdminContext";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { aboutUs, bulletinInfo, refreshBulletinInfo } = useAdmin();
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const [announcement, setAnnouncement] = useState({
    text: bulletinInfo?.text || "",
    formLink: bulletinInfo?.formLink || "#",
    key: Date.now(),
    isLoading: true
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Improved satellite animation - from true left edge to right edge of Earth
  const satelliteX = useTransform(scrollYProgress, [0, 0.2], ["0%", "80%"]);
  
  // Update local state whenever bulletinInfo changes
  useEffect(() => {
    if (bulletinInfo && bulletinInfo.text && bulletinInfo.formLink) {
      console.log("Index: Updating announcement with:", bulletinInfo);
      setAnnouncement({
        text: bulletinInfo.text,
        formLink: bulletinInfo.formLink,
        key: bulletinInfo.lastUpdated || Date.now(),
        isLoading: false
      });
    } else {
      // Handle empty bulletin info
      console.warn("Index: Empty or invalid bulletin info received");
      setAnnouncement(prev => ({
        ...prev,
        isLoading: false
      }));
    }
  }, [bulletinInfo]);
  
  // Refresh bulletin data when component mounts and periodically
  useEffect(() => {
    console.log("Index: Component mounted, refreshing bulletin");
    // Always refresh when component mounts
    refreshBulletinInfo();
    
    // Set up interval to check for updates
    const intervalId = setInterval(() => {
      console.log("Index: Periodic refresh triggered");
      refreshBulletinInfo();
    }, 30000); // Check every 30 seconds
    
    return () => {
      clearInterval(intervalId);
    };
  }, [refreshBulletinInfo]);
  
  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16" ref={containerRef}>
      {/* Information Bulletin */}
      <div className="relative mb-6 overflow-hidden bg-gradient-to-r from-space-blue/20 to-space-accent/20 rounded-md border border-white/10 py-3 px-4">
        <div className="flex items-center gap-2 font-semibold mb-1">
          <Link size={18} className="text-space-accent" />
          <h3 className="text-space-accent">Announcements</h3>
        </div>
        <div className="overflow-hidden min-h-[1.5rem]">
          {announcement.isLoading ? (
            <div className="text-white/70">Loading announcements...</div>
          ) : announcement.text ? (
            <motion.div
              key={announcement.key}
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="whitespace-nowrap"
            >
              <a 
                href={announcement.formLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-space-accent transition-colors"
              >
                {announcement.text}
              </a>
            </motion.div>
          ) : (
            <div className="text-white/70">No announcements available</div>
          )}
        </div>
      </div>
      
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center mb-24 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 satellite-title">
            Student Satellite Program
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
            Embark on a journey to the stars with our passionate satellite research team.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 210, 255, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="space-btn flex items-center mx-auto group"
            onClick={() => navigate('/departments')}
          >
            SUBSYSTEMS
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 relative w-full max-w-[95vw] mx-auto"
        >
          <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-2xl relative">
            <img 
              src="/lovable-uploads/189537bf-6ce2-48bc-875c-58f1362e4af7.png" 
              alt="Earth from space" 
              className="w-full h-full object-cover scale-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
            
            {/* Satellite animation - adjusted position and removed border glow */}
            <motion.div
              className="absolute"
              style={{
                left: satelliteX,
                top: "50%", 
                y: "-50%",
                width: isMobile ? "175px" : "300px"
              }}
            >
              <img
                src="/lovable-uploads/8e75beb5-ab97-4390-85de-eeb236c5c9df.png"
                alt="Satellite"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      <section className="mb-24">
        <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-space-accent">Impact Snapshot</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/90 leading-relaxed mb-6">
              Overview: India is facing an acute air pollution crisis, with NO₂ and SO₂ emerging as key contributors to poor urban air quality, respiratory illnesses, and environmental degradation. While ground-based monitoring is limited and sparse, satellite-based tracking offers a scalable, unbiased, and high-resolution method to observe pollutant distributions across urban and industrial regions. This nanosatellite mission aims to fill critical data gaps and support national environmental, health, and policy goals.
            </p>
            <h3 className="text-xl text-white/90 font-bold mt-6 mb-3">Key Mission Goals:</h3>
            <ul className="list-disc pl-5 space-y-2 text-white/80">
              <li>Detect and quantify atmospheric NO₂ and SO₂ concentrations using UV-Vis spectrometry.</li>
              <li>Provide daily observations of key urban centers and industrial clusters.</li>
              <li>Enable early detection of pollution spikes and trends over time.</li>
              <li>Support public health and environmental regulatory decisions through open-access data.</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-space-blue/20 to-space-accent/20 rounded-2xl p-8 md:p-12 border border-white/10">
          <Orbit className="mx-auto text-space-accent mb-6 animate-rotate-slow" size={48} />
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <div className="text-white/80 mb-8 max-w-xl mx-auto prose prose-invert">
            <p>{aboutUs.content}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
