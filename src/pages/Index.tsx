
import { useNavigate } from "react-router-dom";
import { ArrowRight, Rocket, Users, Brain, Orbit } from "lucide-react";
import { motion } from "framer-motion";
import { useAdmin } from "../contexts/AdminContext";

const Index = () => {
  const navigate = useNavigate();
  const { aboutUs } = useAdmin();

  const handleJoinClick = () => {
    navigate("/confirmation");
  };

  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 satellite-title">
            {aboutUs.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
            Embark on a journey to the stars with our cutting-edge satellite research team.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="space-btn flex items-center mx-auto group"
            onClick={handleJoinClick}
          >
            Join the Team
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </motion.button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 relative w-full max-w-2xl"
        >
          <div className="aspect-video rounded-lg overflow-hidden shadow-2xl animate-float">
            <img 
              src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Satellite in orbit" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
          </div>
          <div className="absolute -bottom-5 -right-5 bg-space-blue/40 backdrop-blur-md p-3 rounded-md border border-white/10 text-space-accent text-sm font-mono animate-pulse-glow">
            SatelliteX Research Initiative
          </div>
        </motion.div>
      </section>
      
      {/* About Section */}
      <section className="mb-24">
        <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-space-accent">About Our Mission</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-white/90 leading-relaxed mb-6">
              {aboutUs.content}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 transition-all duration-300 hover:bg-white/10">
              <Rocket className="text-space-accent mb-4" size={24} />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-white/70 text-sm">Pushing the boundaries of what's possible in satellite technology.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 transition-all duration-300 hover:bg-white/10">
              <Users className="text-space-accent mb-4" size={24} />
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-white/70 text-sm">Working together across disciplines to achieve our mission.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 transition-all duration-300 hover:bg-white/10">
              <Brain className="text-space-accent mb-4" size={24} />
              <h3 className="text-xl font-bold mb-2">Learning</h3>
              <p className="text-white/70 text-sm">Developing skills and knowledge through hands-on experience.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-space-blue/20 to-space-accent/20 rounded-2xl p-8 md:p-12 border border-white/10">
          <Orbit className="mx-auto text-space-accent mb-6 animate-rotate-slow" size={48} />
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Mission?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            We're looking for passionate individuals to help us reach for the stars.
            No prior experience needed - just enthusiasm and a willingness to learn.
          </p>
          <button 
            className="space-btn"
            onClick={handleJoinClick}
          >
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
