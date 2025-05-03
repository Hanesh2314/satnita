
import { useState } from "react";
import { Check, AlertCircle, RefreshCw } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const BulletinEditor = () => {
  const { bulletinInfo, updateBulletinInfo } = useAdmin();
  const { toast } = useToast();
  const [bulletinState, setBulletinState] = useState({
    text: bulletinInfo.text,
    formLink: bulletinInfo.formLink
  });
  
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
    // Clear localStorage for this domain
    localStorage.removeItem("bulletinInfo");

    // Clear all caches
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        toast({
          title: "Cache Cleared",
          description: "Browser cache has been cleared successfully.",
          variant: "default"
        });
      } catch (error) {
        console.warn('Cache clearing failed:', error);
        toast({
          title: "Cache Clearing Failed",
          description: "Could not clear browser cache.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    setIsUpdating(true);
    
    try {
      // Update in context
      updateBulletinInfo({
        text: bulletinState.text,
        formLink: bulletinState.formLink
      });
      
      // Save with timestamp to force cache invalidation
      const timestamp = new Date().getTime();
      const bulletinData = {
        text: bulletinState.text,
        formLink: bulletinState.formLink,
        lastUpdated: timestamp
      };
      
      // Explicitly set in localStorage with timestamp
      localStorage.setItem("bulletinInfo", JSON.stringify(bulletinData));
      
      // Force a page reload to ensure all components re-fetch
      // This helps with cross-device synchronization
      const pageUrl = window.location.href;
      const cacheBust = `cachebust=${timestamp}`;
      const url = pageUrl.includes('?') 
        ? `${pageUrl}&${cacheBust}` 
        : `${pageUrl}?${cacheBust}`;
      
      // Clear any possible cached data
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
        description: "Changes have been published successfully and will be visible to all users.",
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
          >
            <RefreshCw size={16} className="mr-2" />
            Clear Cache
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulletinEditor;
