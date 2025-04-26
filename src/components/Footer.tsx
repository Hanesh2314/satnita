
import { Phone, Mail } from "lucide-react";
import { useAdmin } from "../contexts/AdminContext";

const Footer = () => {
  const { contactInfo } = useAdmin();
  
  return (
    <footer className="w-full bg-black/30 backdrop-blur-md mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} Kshitiz Research Project
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-2">
            <div className="flex items-center text-white/80 text-sm">
              <Phone size={12} className="mr-1 text-space-accent" />
              <span>{contactInfo.contact1.name}: {contactInfo.contact1.phone}</span>
              <Mail size={12} className="ml-3 mr-1 text-space-accent" />
              <span>{contactInfo.contact1.email}</span>
            </div>
            <div className="flex items-center text-white/80 text-sm">
              <Phone size={12} className="mr-1 text-space-accent" />
              <span>{contactInfo.contact2.name}: {contactInfo.contact2.phone}</span>
              <Mail size={12} className="ml-3 mr-1 text-space-accent" />
              <span>{contactInfo.contact2.email}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
