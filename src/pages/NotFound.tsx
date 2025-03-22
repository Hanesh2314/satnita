
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-transition container mx-auto px-6 flex items-center justify-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-2xl p-8 md:p-10 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-400" size={28} />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-white/80 mb-8">Oops! Page not found</p>
        
        <button
          onClick={() => navigate("/")}
          className="space-btn flex items-center mx-auto"
        >
          <Home size={18} className="mr-2" />
          Return Home
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
