
import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const BulletinEditor = () => {
  const { bulletinInfo, updateBulletinInfo } = useAdmin();
  const [bulletinState, setBulletinState] = useState({
    text: bulletinInfo.text,
    formLink: bulletinInfo.formLink
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBulletinState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    
    try {
      updateBulletinInfo({
        text: bulletinState.text,
        formLink: bulletinState.formLink
      });
      
      // Force a reload of localStorage to ensure changes are saved
      localStorage.setItem("bulletinInfo", JSON.stringify({
        text: bulletinState.text,
        formLink: bulletinState.formLink
      }));
      
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
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating Bulletin Info:", error);
      setIsError(true);
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
        
        <button
          type="submit"
          className="space-btn"
        >
          Save Bulletin Changes
        </button>
      </form>
    </div>
  );
};

export default BulletinEditor;
