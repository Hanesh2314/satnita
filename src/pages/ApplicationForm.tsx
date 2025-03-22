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
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false); // Track submission

  useEffect(() => {
    if (departmentId) {
      const dept = getDepartmentById(departmentId);
      if (!dept) {
        navigate("/departments");
      } else {
        setFormState((prev) => ({ ...prev, department: departmentId }));
      }
    }
  }, [departmentId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
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
    const errors: { [key: string]: string } = {};

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

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Form has errors",
        description: "Please correct the errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("form-name", "application-form");
      if (file) formData.append("resume", file);

      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitted(true); // Set form as submitted

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in joining our team.",
      });

      setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Thank You for Applying!</h1>
        <p>Your application has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pt-12 pb-16">
      <div className="max-w-3xl mx-auto">
        <button
          className="flex items-center text-white/70 hover:text-space-accent transition-colors mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-panel rounded-2xl p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-center">Apply to Join Our Team</h1>
          <p className="text-white/70 text-center mb-8">Complete the form below to apply for the satellite research project.</p>

          {/* Netlify Hidden Form */}
          <form name="application-form" data-netlify="true" netlify-honeypot="bot-field" hidden>
            {Object.keys(formState).map((key) => (
              <input key={key} type="text" name={key} />
            ))}
            <input type="file" name="resume" />
          </form>

          <form onSubmit={handleSubmit} name="application-form" method="POST" data-netlify="true" netlify-honeypot="bot-field" encType="multipart/form-data">
            <input type="hidden" name="form-name" value="application-form" />
            <div className="hidden">
              <label>Don't fill this out: <input name="bot-field" /></label>
            </div>

            <label>Name: <input type="text" name="name" value={formState.name} onChange={handleInputChange} required /></label>
            <label>Email: <input type="email" name="email" value={formState.email} onChange={handleInputChange} required /></label>
            <label>Phone: <input type="tel" name="phone" value={formState.phone} onChange={handleInputChange} required /></label>
            <label>Resume (Optional): <input type="file" name="resume" onChange={handleFileChange} /></label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationForm;
