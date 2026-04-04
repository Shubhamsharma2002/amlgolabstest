import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">

  {/* Sidebar */}
  <div className="w-64 fixed left-0 top-0 h-full bg-white shadow">
    <Sidebar />
  </div>

  {/* Right Side */}
  <div className="flex-1 ml-64 flex flex-col">

    <Topbar />

    <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
      {children}
    </main>

  </div>
</div>
  );
}