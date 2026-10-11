import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../data/initialProjects';
import { isValidUrl } from '../../utils/formatters';

const initialFormData = {
  name: '',
  client: '',
  url: '',
  category: '',
  budget: '',
};

export default function ProjectForm({
  editingProject,
  onAddProject,
  onUpdateProject,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name || '',
        client: editingProject.client || '',
        url: editingProject.url || '',
        category: editingProject.category || '',
        budget: editingProject.budget !== undefined ? String(editingProject.budget) : '',
      });
      setErrors({});
    } else {
      setFormData(initialFormData);
      setErrors({});
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error for this field as the user types
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required.';
    }

    if (!formData.client.trim()) {
      newErrors.client = 'Client name is required.';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'Project URL is required.';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    const budgetNum = parseFloat(formData.budget);
    if (!formData.budget.toString().trim() || isNaN(budgetNum) || budgetNum <= 0) {
      newErrors.budget = 'Budget must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const projectPayload = {
      name: formData.name.trim(),
      client: formData.client.trim(),
      url: formData.url.trim(),
      category: formData.category,
      budget: parseFloat(formData.budget),
    };

    if (editingProject) {
      onUpdateProject({
        ...editingProject,
        ...projectPayload,
      });
    } else {
      onAddProject(projectPayload);
      setFormData(initialFormData);
      setErrors({});
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const isEditing = Boolean(editingProject);

  return (
    <aside className="lg:col-span-4 w-full lg:sticky lg:top-20">
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        {/* Form Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isEditing ? 'bg-amber-400' : 'bg-blue-500'
                }`}
              ></span>
              <h3
                id="formTitle"
                className="text-sm sm:text-base font-bold text-white uppercase tracking-tight"
              >
                {isEditing ? 'Edit Project' : 'Create Project'}
              </h3>
            </div>
            <p id="formSubtitle" className="text-xs text-zinc-400 mt-0.5">
              {isEditing
                ? 'Update project details and settings'
                : 'Enter details to add a new project'}
            </p>
          </div>

          <span
            id="formModeBadge"
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
          >
            {isEditing ? 'Editing' : 'New Entry'}
          </span>
        </div>

        {/* Form Fields */}
        <form id="projectForm" onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">
          {/* 1. Project Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-zinc-300 mb-1">
              Project Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. NextGen SaaS Dashboard"
              className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border ${
                errors.name ? 'border-rose-500/80 ring-1 ring-rose-500/20' : 'border-zinc-800'
              } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all`}
            />
            {errors.name && (
              <p id="errorProjectName" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* 2. Client Name */}
          <div>
            <label htmlFor="client" className="block text-xs font-medium text-zinc-300 mb-1">
              Client Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              id="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="e.g. Acme Global Tech"
              className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border ${
                errors.client ? 'border-rose-500/80 ring-1 ring-rose-500/20' : 'border-zinc-800'
              } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all`}
            />
            {errors.client && (
              <p id="errorClientName" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.client}</span>
              </p>
            )}
          </div>

          {/* 3. Project URL */}
          <div>
            <label htmlFor="url" className="block text-xs font-medium text-zinc-300 mb-1">
              Project URL <span className="text-rose-400">*</span>
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://client-project.com"
              className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border ${
                errors.url ? 'border-rose-500/80 ring-1 ring-rose-500/20' : 'border-zinc-800'
              } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all font-mono-code`}
            />
            {errors.url && (
              <p id="errorProjectUrl" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.url}</span>
              </p>
            )}
          </div>

          {/* 4. Category */}
          <div>
            <label htmlFor="category" className="block text-xs font-medium text-zinc-300 mb-1">
              Category <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border ${
                  errors.category ? 'border-rose-500/80 ring-1 ring-rose-500/20' : 'border-zinc-800'
                } rounded-xl text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Select category...
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'AI & ML' ? 'AI & Machine Learning' : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.category && (
              <p id="errorCategory" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.category}</span>
              </p>
            )}
          </div>

          {/* 5. Budget */}
          <div>
            <label htmlFor="budget" className="block text-xs font-medium text-zinc-300 mb-1">
              Unit Budget ($ USD) <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 font-mono-code text-xs">
                $
              </span>
              <input
                type="number"
                id="budget"
                step="any"
                value={formData.budget}
                onChange={handleChange}
                placeholder="5000"
                className={`w-full pl-7 pr-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border ${
                  errors.budget ? 'border-rose-500/80 ring-1 ring-rose-500/20' : 'border-zinc-800'
                } rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all font-mono-code`}
              />
            </div>
            {errors.budget && (
              <p id="errorBudget" className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.budget}</span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center gap-2.5">
            <button
              type="submit"
              id="submitBtn"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 shadow-sm active:scale-98 transition-all cursor-pointer"
            >
              {isEditing ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              )}
              <span id="submitBtnText">{isEditing ? 'Update Project' : 'Add Project'}</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              id="clearBtn"
              className="px-3.5 py-2 sm:py-2.5 text-xs font-medium rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>

          {/* Cancel Edit Mode Button */}
          {isEditing && (
            <button
              type="button"
              id="cancelEditBtn"
              onClick={onCancelEdit}
              className="w-full text-center text-xs text-zinc-400 hover:text-zinc-200 py-1 transition-colors cursor-pointer"
            >
              Cancel Edit Mode
            </button>
          )}
        </form>
      </div>
    </aside>
  );
}
