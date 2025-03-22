
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    const success = login(password);
    if (!success) {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-2xl p-8 md:p-10 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-space-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-space-accent" size={24} />
          </div>
          <h1 className="text-2xl font-bold">Admin Access</h1>
          <p className="text-white/70 mt-2">
            Enter the admin password to access the dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-white mb-2 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="space-input w-full"
              placeholder="Enter admin password"
            />
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-3 flex items-center">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <button
            type="submit"
            className="space-btn w-full"
          >
            Log In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
