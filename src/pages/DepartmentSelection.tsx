
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import departments from "../data/departments";
import { Zap, Radio, Cpu, Compass } from "lucide-react";

const DepartmentSelection = () => {
  const navigate = useNavigate();

  const iconMap: { [key: string]: JSX.Element } = {
    "zap": <Zap size={24} />,
    "radio": <Radio size={24} />,
    "cpu": <Cpu size={24} />,
    "compass": <Compass size={24} />
  };

  const handleDepartmentClick = (id: string) => {
    navigate(`/departments/${id}`);
  };

  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="text-space-accent">Subsystems</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Each subsystem plays a crucial role in our satellite's success. Learn more about the specialized teams working on this project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((department, index) => (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(0, 210, 255, 0.2)"
              }}
              className="glass-panel rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleDepartmentClick(department.id)}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start">
                  <div className="bg-space-accent/20 p-3 rounded-lg text-space-accent mr-4">
                    {iconMap[department.icon]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-space-accent transition-colors">
                      {department.name}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {department.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <span className="text-space-accent text-sm group-hover:translate-x-1 transition-transform">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentSelection;
