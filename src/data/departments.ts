
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
    name: "Power Systems",
    description: "Design and implement the power generation, storage, and distribution systems for the satellite.",
    icon: "zap",
    skills: [
      "Basic Electrical Engineering",
      "Circuit Design",
      "Battery Management"
    ],
    knowledge: [
      "Power Distribution",
      "Energy Storage (Sodium-ion Batteries)",
      "Solar Panels"
    ]
  },
  {
    id: "communication-systems",
    name: "Communication Systems",
    description: "Develop the satellite's communications infrastructure for data transmission to and from Earth.",
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
    name: "Onboard Computers",
    description: "Create the software and hardware systems that control the satellite's operations.",
    icon: "cpu",
    skills: [
      "Embedded Systems",
      "C/C++",
      "Python"
    ],
    knowledge: [
      "Microcontrollers",
      "Real-Time OS",
      "Satellite Data Handling"
    ]
  },
  {
    id: "attitude-determination-control",
    name: "Attitude Determination & Control",
    description: "Design systems that control the satellite's orientation and stability in orbit.",
    icon: "compass",
    skills: [
      "Control Systems",
      "MATLAB/Simulink",
      "Gyroscopes"
    ],
    knowledge: [
      "Reaction Wheels",
      "Orbital Mechanics",
      "Satellite Orientation Control"
    ]
  }
];

export const getDepartmentById = (id: string): Department | undefined => {
  return departments.find(dept => dept.id === id);
};

export default departments;
