
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap, Radio, Cpu, Compass } from "lucide-react";
import { getDepartmentById } from "../data/departments";

const DepartmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const department = getDepartmentById(id || "");

  if (!department) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Department Not Found</h1>
        <button 
          className="space-btn-secondary"
          onClick={() => navigate("/departments")}
        >
          Back to Departments
        </button>
      </div>
    );
  }

  const iconMap: { [key: string]: JSX.Element } = {
    "zap": <Zap size={32} />,
    "radio": <Radio size={32} />,
    "cpu": <Cpu size={32} />,
    "compass": <Compass size={32} />
  };

  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16">
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center text-white/70 hover:text-space-accent transition-colors mb-8"
          onClick={() => navigate("/departments")}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Departments
        </button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-center mb-8">
            <div className="bg-space-accent/20 p-5 rounded-xl text-space-accent mb-6 md:mb-0 md:mr-8 w-16 h-16 flex items-center justify-center">
              {iconMap[department.icon]}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{department.name}</h1>
              <p className="text-white/70 text-lg">{department.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-space-accent mr-2">Required Skills</span>
              </h2>
              <ul className="space-y-3">
                {department.skills.map((skill, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle2 size={18} className="text-space-accent mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-white/80">{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-space-accent mr-2">Required Knowledge</span>
              </h2>
              <ul className="space-y-3">
                {department.knowledge.map((knowledge, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle2 size={18} className="text-space-accent mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-white/80">{knowledge}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="space-btn"
              onClick={() => navigate(`/apply/${department.id}`)}
            >
              Proceed to Apply
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="space-btn-secondary"
              onClick={() => navigate("/departments")}
            >
              Go Back
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
