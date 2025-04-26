import { useNavigate } from "react-router-dom";
import { ArrowRight, Orbit } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAdmin } from "../contexts/AdminContext";
import { useRef } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { aboutUs } = useAdmin();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const satelliteX = useTransform(scrollYProgress, [0, 0.2], ["-50%", "150%"]);
  const satelliteY = useTransform(scrollYProgress, [0, 0.2], ["30%", "-30%"]);
  const satelliteRotate = useTransform(scrollYProgress, [0, 0.2], [0, 35]);

  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16" ref={containerRef}>
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
          <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/189537bf-6ce2-48bc-875c-58f1362e4af7.png" 
              alt="Earth from space" 
              className="w-full h-full object-cover scale-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
          </div>
          
          <motion.div
            className="absolute w-48 h-48 top-1/2 left-0 -translate-y-1/2"
            style={{
              x: satelliteX,
              y: satelliteY,
              rotate: satelliteRotate
            }}
          >
            <img
              src="/lovable-uploads/0720423e-dd28-4520-8232-3c05b21040b9.png"
              alt="Satellite"
              className="w-full h-full object-contain"
            />
          </motion.div>
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
