
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAdmin } from "../contexts/AdminContext";
import AdminLogin from "../components/AdminLogin";
import AboutUsEditor from "../components/AboutUsEditor";
import ApplicationList from "../components/ApplicationList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Edit, Link } from "lucide-react";
import BulletinEditor from "../components/BulletinEditor";

const Admin = () => {
  const { isAuthenticated } = useAdmin();
  
  useEffect(() => {
    document.title = "Admin Panel | SatelliteX";
    return () => {
      document.title = "SatelliteX";
    };
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="page-transition container mx-auto px-6 pt-12 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="glass-panel">
            <TabsTrigger value="applications" className="flex items-center">
              <Users size={16} className="mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center">
              <Edit size={16} className="mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="bulletin" className="flex items-center">
              <Link size={16} className="mr-2" />
              Bulletin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="mt-6">
            <ApplicationList />
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <AboutUsEditor />
            
            <div className="glass-panel rounded-xl p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Help & Instructions</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 mb-4">
                  Use the "Edit 'About Us' Section" panel above to update the content shown on the homepage.
                </p>
                <ul className="space-y-2 text-white/70 list-disc pl-5">
                  <li>The title will appear as the main heading on the homepage.</li>
                  <li>The content will appear in the About section below the hero.</li>
                  <li>Changes will be immediately visible to all users.</li>
                  <li>Refresh the page if you don't see your changes.</li>
                </ul>
                <p className="text-white/70 mt-4">
                  The Applications tab shows all submissions from the application form.
                  New submissions will appear automatically after they're submitted.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bulletin" className="mt-6">
            <BulletinEditor />
            
            <div className="glass-panel rounded-xl p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Bulletin Information</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-white/70 mb-4">
                  Use the "Edit Information Bulletin" panel above to update the announcement text and form link shown on the homepage.
                </p>
                <ul className="space-y-2 text-white/70 list-disc pl-5">
                  <li>The text will appear as scrolling text in the bulletin section.</li>
                  <li>The form link will be used when users click on the bulletin text.</li>
                  <li>Changes will be immediately visible to all users.</li>
                  <li>Refresh the page if you don't see your changes.</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Admin;
