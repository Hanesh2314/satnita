
import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const AboutUsEditor = () => {
  const { aboutUs, updateAboutUs, contactInfo, updateContactInfo } = useAdmin();
  const [aboutUsState, setAboutUsState] = useState({
    title: aboutUs.title,
    content: aboutUs.content
  });
  
  const [contactState, setContactState] = useState({
    contact1: {
      name: contactInfo.contact1.name,
      phone: contactInfo.contact1.phone,
      email: contactInfo.contact1.email
    },
    contact2: {
      name: contactInfo.contact2.name,
      phone: contactInfo.contact2.phone,
      email: contactInfo.contact2.email
    }
  });
  
  const [isSuccessAbout, setIsSuccessAbout] = useState(false);
  const [isErrorAbout, setIsErrorAbout] = useState(false);
  const [isSuccessContact, setIsSuccessContact] = useState(false);
  const [isErrorContact, setIsErrorContact] = useState(false);

  const handleAboutUsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAboutUsState(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    contactNum: 'contact1' | 'contact2',
    field: 'name' | 'phone' | 'email'
  ) => {
    const { value } = e.target;
    setContactState(prev => ({
      ...prev,
      [contactNum]: {
        ...prev[contactNum],
        [field]: value
      }
    }));
  };

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessAbout(false);
    setIsErrorAbout(false);
    
    try {
      updateAboutUs({
        title: aboutUsState.title,
        content: aboutUsState.content
      });
      setIsSuccessAbout(true);
      setTimeout(() => setIsSuccessAbout(false), 3000);
    } catch (error) {
      console.error("Error updating About Us:", error);
      setIsErrorAbout(true);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessContact(false);
    setIsErrorContact(false);
    
    try {
      updateContactInfo({
        contact1: {
          name: contactState.contact1.name,
          phone: contactState.contact1.phone,
          email: contactState.contact1.email
        },
        contact2: {
          name: contactState.contact2.name,
          phone: contactState.contact2.phone,
          email: contactState.contact2.email
        }
      });
      setIsSuccessContact(true);
      setTimeout(() => setIsSuccessContact(false), 3000);
    } catch (error) {
      console.error("Error updating Contact Info:", error);
      setIsErrorContact(true);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Edit 'About Us' Section</h2>
        
        <form onSubmit={handleAboutSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-white mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={aboutUsState.title}
              onChange={handleAboutUsChange}
              className="space-input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-white mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={aboutUsState.content}
              onChange={handleAboutUsChange}
              rows={6}
              className="space-input w-full resize-none"
            />
          </div>
          
          {isSuccessAbout && (
            <div className="bg-green-500/20 border border-green-500/30 text-white rounded-md p-3 flex items-center">
              <Check size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">About Us section updated successfully!</span>
            </div>
          )}
          
          {isErrorAbout && (
            <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-3 flex items-center">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">Failed to update About Us section. Please try again.</span>
            </div>
          )}
          
          <button
            type="submit"
            className="space-btn"
          >
            Save About Us Changes
          </button>
        </form>
      </div>

      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Edit Contact Information</h2>
        
        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-space-accent">Contact 1</h3>
            
            <div>
              <label htmlFor="contact1-name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="contact1-name"
                value={contactState.contact1.name}
                onChange={(e) => handleContactChange(e, 'contact1', 'name')}
                className="space-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="contact1-phone" className="block text-white mb-2">Phone</label>
              <input
                type="text"
                id="contact1-phone"
                value={contactState.contact1.phone}
                onChange={(e) => handleContactChange(e, 'contact1', 'phone')}
                className="space-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="contact1-email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="contact1-email"
                value={contactState.contact1.email}
                onChange={(e) => handleContactChange(e, 'contact1', 'email')}
                className="space-input w-full"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-space-accent">Contact 2</h3>
            
            <div>
              <label htmlFor="contact2-name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="contact2-name"
                value={contactState.contact2.name}
                onChange={(e) => handleContactChange(e, 'contact2', 'name')}
                className="space-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="contact2-phone" className="block text-white mb-2">Phone</label>
              <input
                type="text"
                id="contact2-phone"
                value={contactState.contact2.phone}
                onChange={(e) => handleContactChange(e, 'contact2', 'phone')}
                className="space-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="contact2-email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="contact2-email"
                value={contactState.contact2.email}
                onChange={(e) => handleContactChange(e, 'contact2', 'email')}
                className="space-input w-full"
              />
            </div>
          </div>
          
          {isSuccessContact && (
            <div className="bg-green-500/20 border border-green-500/30 text-white rounded-md p-3 flex items-center">
              <Check size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">Contact information updated successfully!</span>
            </div>
          )}
          
          {isErrorContact && (
            <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-3 flex items-center">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">Failed to update contact information. Please try again.</span>
            </div>
          )}
          
          <button
            type="submit"
            className="space-btn"
          >
            Save Contact Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUsEditor;
