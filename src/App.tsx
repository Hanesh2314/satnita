
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Confirmation from "./pages/Confirmation";
import DepartmentSelection from "./pages/DepartmentSelection";
import DepartmentDetails from "./pages/DepartmentDetails";
import ApplicationForm from "./pages/ApplicationForm";
import Admin from "./pages/Admin";
import StarBackground from "./components/StarBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AdminProvider } from "./contexts/AdminContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <StarBackground />
            <Navbar />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/departments" element={<DepartmentSelection />} />
                <Route path="/departments/:id" element={<DepartmentDetails />} />
                <Route path="/apply" element={<ApplicationForm />} />
                <Route path="/apply/:departmentId" element={<ApplicationForm />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
