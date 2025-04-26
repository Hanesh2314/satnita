
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Radio, Cpu, Compass } from "lucide-react";
import { getDepartmentById } from "../data/departments";

const DepartmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const department = getDepartmentById(id || "");

  if (!department) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Subsystem Not Found</h1>
        <button 
          className="space-btn-secondary"
          onClick={() => navigate("/departments")}
        >
          Back to Subsystems
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

  const subsystemContent: {
    [key: string]: {
      quote: string;
      description: string;
      responsibilities: string[];
      closing: string;
    }
  } = {
    'power-systems': {
      quote: '"Powering possibilities — one solar cell at a time."',
      description: 'The Power System takes care of energy generation, storage, and distribution onboard. With tight constraints on space, weight, and exposure, the system must be smart, efficient, and failsafe.',
      responsibilities: [
        'Solar panel configuration and deployment',
        'Battery management systems (BMS)',
        'Power conditioning and conversion',
        'Load regulation and protection circuitry'
      ],
      closing: 'It\'s more than just turning the satellite "on" — it\'s about keeping it alive and balanced, 24/7.'
    },
    'communication-systems': {
      quote: '"What good is a satellite if it can\'t speak to Earth?"',
      description: 'The Communication Subsystem ensures real-time, two-way transmission between the satellite and our ground station.',
      responsibilities: [
        'Antenna design and orientation',
        'RF link budget analysis',
        'UHF/VHF/S-band transceivers',
        'Signal modulation and error correction',
        'Ground station interfacing'
      ],
      closing: 'The goal? Seamless communication that never drops a beat — even from hundreds of kilometers above.'
    },
    'onboard-computers': {
      quote: '"The central nervous system of the satellite."',
      description: 'The OBC manages and controls all onboard functions — from subsystem coordination to data handling and fault detection.',
      responsibilities: [
        'Selecting space-tolerant microcontrollers or SoCs',
        'Real-time OS setup and software architecture',
        'Writing and testing control algorithms',
        'Ensuring redundancy and reliability',
        'Managing memory, health monitoring, and system resets'
      ],
      closing: 'It\'s the code that holds the mission together — in orbit, there are no second chances.'
    },
    'attitude-determination-control': {
      quote: '"In space, knowing where you are — and where you\'re facing — is everything."',
      description: 'The GNC subsystem handles the satellite\'s orientation and trajectory in orbit. It combines hardware and algorithms to ensure our satellite stays pointed at the right target, at the right time.',
      responsibilities: [
        'Attitude determination using sun sensors, gyros, magnetometers',
        'Attitude control using reaction wheels and magnetorquers',
        'Orbit propagation and maneuver simulation',
        'Kalman filtering and sensor fusion'
      ],
      closing: 'It\'s rocket science — and we\'re building it from scratch.'
    },
    'payload': {
      quote: '"The soul of the satellite: what it sees, it shares."',
      description: 'This is the scientific heart of our mission. The Payload team is developing instruments capable of detecting trace amounts of SO₂ and NO₂ from orbit.',
      responsibilities: [
        'Selecting and integrating UV/VIS spectrometers or gas sensors',
        'Calibrating sensors for Earth observation conditions',
        'Designing mechanical mounts and thermal controls for instruments',
        'Coordinating with the Data Processing Division'
      ],
      closing: 'This is where engineering meets environmental science — to protect the air we breathe.'
    },
    'data-processing': {
      quote: '"Turning pixels and numbers into knowledge."',
      description: 'Raw data from space means nothing unless it\'s processed, corrected, and interpreted.',
      responsibilities: [
        'Spectral data calibration and preprocessing',
        'Atmospheric correction algorithms',
        'Gas concentration retrieval (e.g., DOAS techniques)',
        'Data visualization and heatmap generation',
        'Long-term data archiving and sharing'
      ],
      closing: 'It\'s a fusion of space science, data engineering, and machine learning — and it fuels the story our satellite tells.'
    }
  };

  // Get content for this specific subsystem, or use a fallback if not found
  const content = subsystemContent[department.id] || {
    quote: "Innovation in space exploration.",
    description: department.description,
    responsibilities: department.skills,
    closing: "Join us in pushing the boundaries of what's possible in satellite technology."
  };

  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16">
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center text-white/70 hover:text-space-accent transition-colors mb-8"
          onClick={() => navigate("/departments")}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Subsystems
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
          
          <div className="mb-10">
            <blockquote className="border-l-4 border-space-accent pl-4 italic text-white/90 text-xl mb-6">
              {content.quote}
            </blockquote>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/90 mb-6">{content.description}</p>
              
              <h2 className="text-xl font-bold mb-4 text-space-accent">The team is involved in:</h2>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {content.responsibilities.map((item, i) => (
                  <li key={i} className="text-white/80">{item}</li>
                ))}
              </ul>
              
              <p className="text-white/90 mt-6">{content.closing}</p>
            </div>
          </div>
          
          <div className="flex justify-center">
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
