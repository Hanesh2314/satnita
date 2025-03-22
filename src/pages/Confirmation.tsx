
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";

const Confirmation = () => {
  const navigate = useNavigate();

  const handleReadyClick = () => {
    navigate("/departments");
  };

  const handleGoBackClick = () => {
    navigate("/");
  };

  return (
    <div className="page-transition container mx-auto px-6 flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center"
      >
        <div className="w-20 h-20 bg-space-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="text-space-accent" size={32} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Ready for the Challenge?
        </h1>
        
        <p className="text-lg text-white/80 mb-8 leading-relaxed">
          "It doesn't matter if you don't have prior experience. What truly matters is your willingness to learn, explore, and contribute. Are you ready to take on this challenge?"
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="space-btn"
            onClick={handleReadyClick}
          >
            Yes, I'm Ready!
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="space-btn-secondary flex items-center justify-center"
            onClick={handleGoBackClick}
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Confirmation;
