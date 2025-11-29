import DailyChecklist from '@/components/DailyChecklist';
import Dashboard from '@/components/Dashboard';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-950 p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:order-1">
                    <DailyChecklist />
                </div>
                <div className="hidden md:block md:order-2 sticky top-8 h-fit">
                    <Dashboard />
                </div>
            </div>
        </main>
    );
}
