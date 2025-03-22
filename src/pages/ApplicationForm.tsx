import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getDepartmentById } from "../data/departments";
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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (departmentId) {
      const dept = getDepartmentById(departmentId);
      if (!dept) navigate("/departments");
      else setFormState((prev) => ({ ...prev, department: departmentId }));
    }
  }, [departmentId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

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

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email)) errors.email = "Valid email is required";
    if (!formState.phone.trim()) errors.phone = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Form has errors", description: "Please correct them before submitting.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => formData.append(key, value));
      formData.append("form-name", "application-form");
      if (file) formData.append("resume", file);

      const response = await fetch("/", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Submission failed");

      setSubmitted(true);
      toast({ title: "Application Submitted!", description: "Thank you for applying!" });
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      toast({ title: "Submission Error", description: "Try again later.", variant: "destructive" });
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
        <button className="flex items-center text-white/70 hover:text-space-accent mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} className="mr-2" /> Go Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-panel p-8 rounded-2xl">
          <h1 className="text-3xl font-bold text-center mb-4">Apply to Join Our Team</h1>
          <p className="text-white/70 text-center mb-6">Fill out the form below to apply for our research project.</p>

          {/* Netlify Hidden Form */}
          <form name="application-form" data-netlify="true" hidden>
            {Object.keys(formState).map((key) => (
              <input key={key} type="text" name={key} />
            ))}
            <input type="file" name="resume" />
          </form>

          <form onSubmit={handleSubmit} name="application-form" method="POST" data-netlify="true" encType="multipart/form-data">
            <input type="hidden" name="form-name" value="application-form" />
            <div className="space-y-4">
              <div>
                <label className="block text-white">Name:</label>
                <input className="input-field text-black bg-white p-2 rounded-md w-full" type="text" name="name" value={formState.name} onChange={handleInputChange} required />
                {formErrors.name && <p className="text-red-400 text-sm">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-white">Email:</label>
                <input className="input-field text-black bg-white p-2 rounded-md w-full" type="email" name="email" value={formState.email} onChange={handleInputChange} required />
                {formErrors.email && <p className="text-red-400 text-sm">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-white">Phone:</label>
                <input className="input-field text-black bg-white p-2 rounded-md w-full" type="tel" name="phone" value={formState.phone} onChange={handleInputChange} required />
                {formErrors.phone && <p className="text-red-400 text-sm">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-white">Year (Optional):</label>
                <select className="input-field text-black bg-white p-2 rounded-md w-full" name="year" value={formState.year} onChange={handleInputChange}>
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-white">Branch (Optional):</label>
                <input className="input-field text-black bg-white p-2 rounded-md w-full" type="text" name="branch" value={formState.branch} onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-white">Resume (Optional):</label>
                <input className="input-field text-black bg-white p-2 rounded-md w-full" type="file" name="resume" onChange={handleFileChange} />
              </div>

              <button className="btn-primary w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationForm;
