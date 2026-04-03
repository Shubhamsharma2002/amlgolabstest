import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}