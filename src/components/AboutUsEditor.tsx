
import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const AboutUsEditor = () => {
  const { aboutUs, updateAboutUs } = useAdmin();
  const [formState, setFormState] = useState({
    title: aboutUs.title,
    content: aboutUs.content
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    
    try {
      updateAboutUs({
        title: formState.title,
        content: formState.content
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating About Us:", error);
      setIsError(true);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Edit 'About Us' Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-white mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            className="space-input w-full"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-white mb-2">Content</label>
          <textarea
            id="content"
            name="content"
            value={formState.content}
            onChange={handleInputChange}
            rows={6}
            className="space-input w-full resize-none"
          />
        </div>
        
        {isSuccess && (
          <div className="bg-green-500/20 border border-green-500/30 text-white rounded-md p-3 flex items-center">
            <Check size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">About Us section updated successfully!</span>
          </div>
        )}
        
        {isError && (
          <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-3 flex items-center">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">Failed to update About Us section. Please try again.</span>
          </div>
        )}
        
        <button
          type="submit"
          className="space-btn"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AboutUsEditor;
