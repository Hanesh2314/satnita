
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowLeft, Upload, XCircle } from "lucide-react";
import { getDepartmentById } from "../data/departments";
import departments from "../data/departments";
import { toast } from "@/components/ui/use-toast";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { departmentId } = useParams<{ departmentId: string }>();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    department: departmentId || "",
    year: "",
    branch: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    if (departmentId) {
      const dept = getDepartmentById(departmentId);
      if (!dept) {
        navigate("/departments");
      } else {
        setFormState(prev => ({ ...prev, department: departmentId }));
      }
    }
  }, [departmentId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email is invalid";
    }
    if (!formState.phone.trim()) errors.phone = "Phone is required";
    if (!formState.department) errors.department = "Department is required";
    if (!formState.year) errors.year = "Year is required";
    if (!formState.branch.trim()) errors.branch = "Branch is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form has errors",
        description: "Please correct the errors and try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create form data for Netlify Forms
    const formData = new FormData();
    formData.append("form-name", "application-form");
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    if (file) {
      formData.append("resume", file);
    }
    
    try {
      // Submit to Netlify Forms endpoint
      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest in joining our team.",
          variant: "default"
        });
        navigate("/");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16">
      <div className="max-w-3xl mx-auto">
        <button
          className="flex items-center text-white/70 hover:text-space-accent transition-colors mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl p-8 md:p-10"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Apply to Join Our Team</h1>
          <p className="text-white/70 text-center mb-8">
            Complete the form below to apply for the satellite research project.
          </p>
          
          {/* Hidden form for Netlify */}
          <form name="application-form" data-netlify="true" netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="tel" name="phone" />
            <input type="text" name="department" />
            <input type="text" name="year" />
            <input type="text" name="branch" />
            <input type="file" name="resume" />
          </form>
          
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <input type="hidden" name="form-name" value="application-form" />
            <div className="hidden">
              <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-white mb-2 font-medium">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                className={`space-input w-full ${formErrors.name ? 'border-red-500' : ''}`}
                placeholder="Your full name"
              />
              {formErrors.name && <p className="text-red-500 mt-1 text-sm">{formErrors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white mb-2 font-medium">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className={`space-input w-full ${formErrors.email ? 'border-red-500' : ''}`}
                placeholder="your.email@example.com"
              />
              {formErrors.email && <p className="text-red-500 mt-1 text-sm">{formErrors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-white mb-2 font-medium">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                className={`space-input w-full ${formErrors.phone ? 'border-red-500' : ''}`}
                placeholder="Your phone number"
              />
              {formErrors.phone && <p className="text-red-500 mt-1 text-sm">{formErrors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="department" className="block text-white mb-2 font-medium">Department *</label>
              <select
                id="department"
                name="department"
                value={formState.department}
                onChange={handleInputChange}
                className={`space-input w-full bg-space-dark/90 ${formErrors.department ? 'border-red-500' : ''}`}
              >
                <option value="">Select a department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              {formErrors.department && <p className="text-red-500 mt-1 text-sm">{formErrors.department}</p>}
            </div>
            
            <div>
              <label htmlFor="year" className="block text-white mb-2 font-medium">Year *</label>
              <select
                id="year"
                name="year"
                value={formState.year}
                onChange={handleInputChange}
                className={`space-input w-full bg-space-dark/90 ${formErrors.year ? 'border-red-500' : ''}`}
              >
                <option value="">Select your year</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {formErrors.year && <p className="text-red-500 mt-1 text-sm">{formErrors.year}</p>}
            </div>
            
            <div>
              <label htmlFor="branch" className="block text-white mb-2 font-medium">Branch *</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formState.branch}
                onChange={handleInputChange}
                className={`space-input w-full ${formErrors.branch ? 'border-red-500' : ''}`}
                placeholder="Your branch of study"
              />
              {formErrors.branch && <p className="text-red-500 mt-1 text-sm">{formErrors.branch}</p>}
            </div>
            
            <div>
              <label htmlFor="resume" className="block text-white mb-2 font-medium">Resume (Optional)</label>
              {!file ? (
                <div className="border border-dashed border-white/30 rounded-md p-8 text-center cursor-pointer hover:border-space-accent/50 transition-colors">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="resume" className="cursor-pointer flex flex-col items-center">
                    <Upload className="mb-2 text-white/70" size={24} />
                    <span className="text-white/70">Click to upload your resume</span>
                    <span className="text-white/50 text-sm mt-1">(PDF, DOC, DOCX)</span>
                  </label>
                </div>
              ) : (
                <div className="bg-white/10 rounded-md p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-space-accent/20 p-2 rounded-md text-space-accent mr-3">
                      <Check size={20} />
                    </div>
                    <span className="text-white/80 text-sm truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="text-white/70 hover:text-red-400 transition-colors"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              )}
              <p className="text-white/50 text-sm mt-2">Uploading a resume is optional</p>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="space-btn w-full flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationForm;
