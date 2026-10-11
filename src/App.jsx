import { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectSummary from './components/Summary/ProjectSummary';
import ProjectForm from './components/Form/ProjectForm';
import ProjectControls from './components/Controls/ProjectControls';
import ProjectList from './components/Projects/ProjectList';
import { INITIAL_PROJECTS } from './data/initialProjects';

export default function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [editingProject, setEditingProject] = useState(null);

  // Controls state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('default');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Filtered & Sorted Projects pipeline
  const displayedProjects = useMemo(() => {
    // 1. Filtering
    const filtered = projects.filter((project) => {
      // Search match
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = project.name?.toLowerCase().includes(q);
        const matchClient = project.client?.toLowerCase().includes(q);
        const matchUrl = project.url?.toLowerCase().includes(q);
        if (!matchName && !matchClient && !matchUrl) return false;
      }

      // Category filter
      if (categoryFilter !== 'ALL' && project.category !== categoryFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && project.status !== statusFilter) {
        return false;
      }

      // Starred filter
      if (onlyFavorites && !project.isFavorite) {
        return false;
      }

      return true;
    });

    // 2. Sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'budget-asc') {
        const totalA = (Number(a.budget) || 0) * (Number(a.quantity) || 1);
        const totalB = (Number(b.budget) || 0) * (Number(b.quantity) || 1);
        return totalA - totalB;
      }
      if (sortBy === 'budget-desc') {
        const totalA = (Number(a.budget) || 0) * (Number(a.quantity) || 1);
        const totalB = (Number(b.budget) || 0) * (Number(b.quantity) || 1);
        return totalB - totalA;
      }
      return 0;
    });
  }, [projects, searchTerm, categoryFilter, statusFilter, sortBy, onlyFavorites]);

  // Project CRUD & Action Handlers
  const handleAddProject = (newProjectData) => {
    const newProject = {
      ...newProjectData,
      id: Date.now(),
      quantity: 1,
      status: 'Pending',
      isFavorite: false,
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setEditingProject(null);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  const handleStartEdit = (project) => {
    setEditingProject(project);
    // Smooth scroll to top/form on smaller screens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (editingProject?.id === projectId) {
      setEditingProject(null);
    }
  };

  const handleToggleStatus = (projectId) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newStatus = p.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...p, status: newStatus };
        }
        return p;
      })
    );

    if (editingProject?.id === projectId) {
      setEditingProject((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === 'Completed' ? 'Pending' : 'Completed',
            }
          : null
      );
    }
  };

  const handleToggleFavorite = (projectId) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, isFavorite: !p.isFavorite };
        }
        return p;
      })
    );

    if (editingProject?.id === projectId) {
      setEditingProject((prev) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    }
  };

  const handleQuantityChange = (projectId, delta) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newQty = Math.max(1, (Number(p.quantity) || 1) + delta);
          return { ...p, quantity: newQty };
        }
        return p;
      })
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setSortBy('default');
    setOnlyFavorites(false);
  };

  return (
    <div className="bg-[#09090b] text-zinc-100 min-h-screen antialiased flex flex-col selection:bg-zinc-100 selection:text-zinc-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Project Summary Row */}
        <ProjectSummary projects={projects} />

        {/* Main 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Create / Edit Project Form */}
          <ProjectForm
            editingProject={editingProject}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onCancelEdit={handleCancelEdit}
          />

          {/* Right Column: Project Controls & Cards */}
          <section className="lg:col-span-8 w-full space-y-4 sm:space-y-6">
            <ProjectControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onlyFavorites={onlyFavorites}
              onToggleFavorites={() => setOnlyFavorites((prev) => !prev)}
              onResetFilters={handleResetFilters}
              displayedCount={displayedProjects.length}
              totalCount={projects.length}
            />

            <ProjectList
              projects={displayedProjects}
              onEdit={handleStartEdit}
              onDelete={handleDeleteProject}
              onToggleStatus={handleToggleStatus}
              onToggleFavorite={handleToggleFavorite}
              onQuantityChange={handleQuantityChange}
              onResetFilters={handleResetFilters}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
