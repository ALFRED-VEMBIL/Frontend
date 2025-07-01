import WidgetSidebar from '@/components/widgets/Sidebar'
import Navbar from '@/components/widgets/Navbar';

export default function WidgetLayout({ children }) {
  return (
    <div className="flex w-full h-full">
        {/* Left column – fixed 250px */}
        <WidgetSidebar />

        {/* Right column – take the rest */}
        <div className="flex-1 h-[100vh] overflow-auto">
            <Navbar />
            {children}
        </div>
    </div>
  );
}