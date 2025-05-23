
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  branch: string;
  createdAt: string;
  resumeUrl?: string;
}

const ApplicationList = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // In a real Netlify environment, you would fetch from Netlify API
        // For now, we'll use mock data to demonstrate how it would work
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // These mock submissions will be replaced by real Netlify form submissions
        // when deployed and form submissions are received
        const mockData: Application[] = [
          {
            id: "app123",
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            department: "power-systems",
            year: "2nd Year",
            branch: "Electrical Engineering",
            createdAt: new Date().toISOString()
          },
          {
            id: "app124",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "098-765-4321",
            department: "communication-systems",
            year: "3rd Year",
            branch: "Electronics Engineering",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            resumeUrl: "#resume-url"
          },
          {
            id: "app125",
            name: "Alex Johnson",
            email: "alex@example.com",
            phone: "555-123-4567",
            department: "onboard-computers",
            year: "4th Year",
            branch: "Computer Engineering",
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ];
        
        setApplications(mockData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again later.");
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, []);

  const formatDepartment = (deptId: string) => {
    const deptMap: {[key: string]: string} = {
      "power-systems": "Power Systems",
      "communication-systems": "Communication Systems",
      "onboard-computers": "Onboard Computers",
      "attitude-determination-control": "Attitude Determination & Control"
    };
    return deptMap[deptId] || deptId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <div className="glass-panel rounded-xl p-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-space-accent"></div>
          <span className="ml-3 text-white/70">Loading applications...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel rounded-xl p-6">
        <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-4 flex items-center">
          <AlertCircle size={20} className="mr-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Applications</h2>
      
      {applications.length === 0 ? (
        <p className="text-white/70 text-center py-8">No applications submitted yet.</p>
      ) : (
        <div className="space-y-6">
          <p className="text-white/70 text-sm mb-4">
            Showing {applications.length} application{applications.length !== 1 ? 's' : ''}
          </p>
          
          {applications.map(app => (
            <div key={app.id} className="bg-white/5 rounded-lg p-5 border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{app.name}</h3>
                <p className="text-white/60 text-sm">
                  Submitted: {formatDate(app.createdAt)}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white/90">{app.email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Phone</p>
                  <p className="text-white/90">{app.phone}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Department</p>
                  <p className="text-white/90">{formatDepartment(app.department)}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Year & Branch</p>
                  <p className="text-white/90">{app.year}, {app.branch}</p>
                </div>
              </div>
              
              {app.resumeUrl && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <a 
                    href={app.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-space-accent hover:underline text-sm"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          ))}
          
          <div className="text-center py-4">
            <p className="text-white/60 text-sm">
              When deployed to Netlify, real form submissions will appear here.
              You can also access them through the Netlify dashboard under the Forms section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
