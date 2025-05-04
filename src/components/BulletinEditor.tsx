
import { useState, useEffect } from "react";
import { Check, AlertCircle, RefreshCw } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const BulletinEditor = () => {
  const { bulletinInfo, updateBulletinInfo, refreshBulletinInfo } = useAdmin();
  const { toast } = useToast();
  // Initialize with default values to prevent null/undefined issues
  const [bulletinState, setBulletinState] = useState({
    text: "Applications are now open . click here",
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScoTPloDuYsuSId-j6OVgHTRFSsN6eF2Y6O2RUvQL_O7CHlBA/viewform?usp=header"
  });
  
  // Update local state whenever bulletinInfo changes from context
  useEffect(() => {
    if (bulletinInfo && bulletinInfo.text && bulletinInfo.formLink) {
      console.log("Updating bulletin editor state from context:", bulletinInfo);
      setBulletinState({
        text: bulletinInfo.text,
        formLink: bulletinInfo.formLink
      });
    }
  }, [bulletinInfo]);
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBulletinState(prev => ({ ...prev, [name]: value }));
  };

  const handleClearCache = async () => {
    setIsUpdating(true);
    try {
      // Clear storage and reload with defaults
      localStorage.removeItem("bulletinInfo");
      
      // Reset to default values
      setBulletinState({
        text: "Applications are now open . click here",
        formLink: "https://docs.google.com/forms/d/e/1FAIpQLScoTPloDuYsuSId-j6OVgHTRFSsN6eF2Y6O2RUvQL_O7CHlBA/viewform?usp=header"
      });
      
      // Clear browser caches
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        } catch (error) {
          console.warn('Cache clearing failed:', error);
        }
      }
      
      // Force refresh data
      refreshBulletinInfo();
      
      setIsUpdating(false);
      toast({
        title: "Cache Cleared",
        description: "Local cache cleared and data refreshed.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error clearing cache:", error);
      toast({
        title: "Cache Clearing Failed",
        description: "Could not clear browser cache.",
        variant: "destructive"
      });
      setIsUpdating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!bulletinState.text || !bulletinState.text.trim()) {
      toast({
        title: "Validation Error",
        description: "Announcement text cannot be empty.",
        variant: "destructive"
      });
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
      return;
    }
    
    if (!bulletinState.formLink || !bulletinState.formLink.trim()) {
      toast({
        title: "Validation Error",
        description: "Form link cannot be empty.",
        variant: "destructive"
      });
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
      return;
    }
    
    setIsSuccess(false);
    setIsError(false);
    setIsUpdating(true);
    
    try {
      console.log("Submitting bulletin update:", bulletinState);
      
      // Update in context
      updateBulletinInfo({
        text: bulletinState.text.trim(),
        formLink: bulletinState.formLink.trim()
      });
      
      // Force a cache clear
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        } catch (error) {
          console.warn('Cache clearing failed:', error);
        }
      }
      
      setIsUpdating(false);
      setIsSuccess(true);
      
      // Show success toast
      toast({
        title: "Bulletin Updated",
        description: "Changes have been published successfully.",
        variant: "default"
      });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating Bulletin Info:", error);
      setIsUpdating(false);
      setIsError(true);
      toast({
        title: "Update Failed",
        description: "Failed to update bulletin information. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Edit Information Bulletin</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-white mb-2">Announcement Text</label>
          <textarea
            id="text"
            name="text"
            value={bulletinState.text}
            onChange={handleInputChange}
            rows={3}
            className="space-input w-full resize-none"
            placeholder="Enter announcement text here..."
            required
          />
        </div>
        
        <div>
          <label htmlFor="formLink" className="block text-white mb-2">Google Form Link</label>
          <input
            type="url"
            id="formLink"
            name="formLink"
            value={bulletinState.formLink}
            onChange={handleInputChange}
            className="space-input w-full"
            placeholder="https://forms.google.com/..."
            required
          />
        </div>
        
        {isSuccess && (
          <div className="bg-green-500/20 border border-green-500/30 text-white rounded-md p-3 flex items-center">
            <Check size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">Bulletin information updated successfully!</span>
          </div>
        )}
        
        {isError && (
          <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-3 flex items-center">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">Failed to update bulletin information. Please try again.</span>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="submit"
            className="space-btn flex items-center justify-center"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Bulletin Changes"
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClearCache}
            className="space-btn-secondary flex items-center justify-center"
            disabled={isUpdating}
          >
            <RefreshCw size={16} className="mr-2" />
            {isUpdating ? "Processing..." : "Reset to Default"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulletinEditor;
