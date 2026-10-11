import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';

export default function ProjectList({
  projects = [],
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFavorite,
  onQuantityChange,
  onResetFilters,
}) {
  if (projects.length === 0) {
    return <EmptyState onResetFilters={onResetFilters} />;
  }

  return (
    <div id="projectsGrid" className="space-y-3.5 sm:space-y-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onToggleFavorite={onToggleFavorite}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}
