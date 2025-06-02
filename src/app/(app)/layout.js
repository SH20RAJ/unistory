import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ReferralNotifications } from "@/components/referrals/ReferralNotifications";

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Navigation */}
            <div className="md:hidden">
                <MainNavigation />
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex h-screen">
                {/* Sidebar */}
                <AppSidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Bar for Desktop */}
                    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-6">
                        <div className="flex items-center space-x-4">
                            {/* Search, notifications, etc. can go here */}
                            <MainNavigation showOnlyIcons />
                        </div>
                    </div>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="container mx-auto px-6 py-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>

            {/* Mobile Content */}
            <div className="md:hidden">
                <main className="pb-20">
                    <div className="container mx-auto mpx-4 mpy-4">
                        {children}
                    </div>
                </main>
                <BottomNavigation />
            </div>

            {/* Global Referral Notifications */}
            <ReferralNotifications />
        </div>
    );
}
