
export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string; // Icon name from lucide-react
  skills: string[];
  knowledge: string[];
}

const departments: Department[] = [
  {
    id: "power-systems",
    name: "Power System",
    description: "The foundation that provides energy to all satellite components through solar collection, storage, and distribution.",
    icon: "zap",
    skills: [
      "Electrical Engineering",
      "Circuit Design",
      "Battery Management"
    ],
    knowledge: [
      "Power Distribution",
      "Energy Storage",
      "Solar Panels"
    ]
  },
  {
    id: "communication-systems",
    name: "Communication Subsystem",
    description: "Enables the satellite to transmit and receive data between space and Earth ground stations.",
    icon: "radio",
    skills: [
      "RF Engineering",
      "Antenna Design",
      "Signal Processing"
    ],
    knowledge: [
      "Satellite Communication",
      "Modulation Techniques",
      "Data Transmission"
    ]
  },
  {
    id: "onboard-computers",
    name: "On-Board Computers",
    description: "The central nervous system that controls all satellite operations and processes data.",
    icon: "cpu",
    skills: [
      "Embedded Systems",
      "C/C++",
      "Python"
    ],
    knowledge: [
      "Microcontrollers",
      "Real-Time OS",
      "Data Handling"
    ]
  },
  {
    id: "attitude-determination-control",
    name: "GNC (Guidance, Navigation & Control)",
    description: "Manages the satellite's orientation and position in orbit to maintain stability and pointing accuracy.",
    icon: "compass",
    skills: [
      "Control Systems",
      "MATLAB/Simulink",
      "Attitude Determination"
    ],
    knowledge: [
      "Reaction Wheels",
      "Orbital Mechanics",
      "Orientation Control"
    ]
  },
  {
    id: "payload",
    name: "Payload Subsystem",
    description: "The scientific heart of our mission focused on pollution detection and monitoring from orbit.",
    icon: "zap",
    skills: [
      "Sensor Integration",
      "Environmental Science",
      "Optical Systems"
    ],
    knowledge: [
      "Spectrometry",
      "Gas Detection",
      "Instrument Calibration"
    ]
  },
  {
    id: "data-processing",
    name: "Payload Data Processing",
    description: "Transforms raw satellite data into meaningful environmental insights and visualizations.",
    icon: "cpu",
    skills: [
      "Data Analysis",
      "Algorithm Development", 
      "Machine Learning"
    ],
    knowledge: [
      "Atmospheric Models",
      "Image Processing",
      "Data Visualization"
    ]
  }
];

export const getDepartmentById = (id: string): Department | undefined => {
  return departments.find(dept => dept.id === id);
};

export default departments;
