import { AnimatedTitle } from '../../../shared/components/motion/AnimatedTitle';

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <AnimatedTitle
          title="Hospital CRM overview"
          className="text-3xl font-bold tracking-tight text-[#0f1a3a]"
        />
        <p className="mt-1 text-sm text-slate-500">A live-style snapshot populated with temporary operational data.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total patient enquiries", "1,450", "+18.2%"],
          ["Appointments today", "42", "36 confirmed"],
          ["Active sales executives", "24", "Across 3 branches"],
          ["Monthly revenue", "₹61.86L", "95.2% of target"],
        ].map(([label, value, detail], index) => (
          <div key={label} className={`rounded-md border p-6 shadow-sm ${index === 0 ? "dashboard-focus-card border-[#0f1a34] bg-[#0f1a34]" : "border-[#e2e8f0] bg-white"}`}>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${index === 0 ? "text-white/70" : "text-slate-500"}`}>{label}</h2>
            <p className={`mt-3 text-3xl font-black ${index === 0 ? "text-white" : "text-[#0f1a3a]"}`}>{value}</p>
            <p className={`mt-2 text-xs font-semibold ${index === 0 ? "text-white/70" : "text-slate-500"}`}>{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
