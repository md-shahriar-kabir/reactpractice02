import SummaryCard from './SummaryCard';
import { formatCurrency } from '../../utils/formatters';

export default function ProjectSummary({ projects = [] }) {
  const totalProjects = projects.length;
  const pendingProjects = projects.filter((p) => p.status === 'Pending').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const totalBudget = projects.reduce(
    (sum, p) => sum + (Number(p.budget) || 0) * (Number(p.quantity) || 1),
    0
  );

  return (
    <section aria-labelledby="summary-heading" className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="summary-heading"
            className="text-base sm:text-lg font-bold text-white tracking-tight"
          >
            Project Summary
          </h2>
          <p className="text-xs text-zinc-400">
            Live operational overview across active clients, deliveries &amp; budget.
          </p>
        </div>
      </div>

      {/* 4 Cards Grid: 2 cols on mobile, 4 cols on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Projects */}
        <SummaryCard
          title="Total Projects"
          value={totalProjects}
          subtext="projects"
          hoverBorderClass="hover:border-zinc-700"
          iconBoxClass="bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
          valueTextClass="text-white"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
        />

        {/* Pending Projects */}
        <SummaryCard
          title="Pending"
          value={pendingProjects}
          subtext="in queue"
          hoverBorderClass="hover:border-amber-500/40"
          iconBoxClass="bg-amber-500/10 text-amber-400 border border-amber-500/20"
          valueTextClass="text-amber-400"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        {/* Completed Projects */}
        <SummaryCard
          title="Completed"
          value={completedProjects}
          subtext="delivered"
          hoverBorderClass="hover:border-emerald-500/40"
          iconBoxClass="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          valueTextClass="text-emerald-400"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        {/* Total Budget */}
        <SummaryCard
          title="Total Budget"
          value={`$${formatCurrency(totalBudget)}`}
          subtext="USD"
          hoverBorderClass="hover:border-blue-500/40"
          iconBoxClass="bg-blue-500/10 text-blue-400 border border-blue-500/20"
          valueTextClass="text-white"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      </div>
    </section>
  );
}
