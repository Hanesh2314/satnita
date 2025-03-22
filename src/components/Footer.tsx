
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black/30 backdrop-blur-md mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} SatelliteX Research Project
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-white/80 text-sm mb-2">
              Created by Hanesh Sharma, 2nd Year, Production Engineering
            </p>
            <p className="text-white/60 text-xs flex items-center">
              Made with <Heart size={12} className="mx-1 text-red-400" /> and code
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
