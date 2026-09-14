export default function Placeholder() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center p-6">
      <div className="text-center p-8 bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Admin Dashboard</h1>
        <p className="text-neutral-400">This feature is scheduled for Phase 4. It will contain global metrics.</p>
        <a href="/dashboard" className="mt-6 inline-block text-green-500 hover:underline">Return to User Dashboard</a>
      </div>
    </div>
  );
}
