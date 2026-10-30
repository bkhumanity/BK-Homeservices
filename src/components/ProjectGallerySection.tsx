import React, { useState } from 'react';
import { Sparkles, Eye, ArrowLeftRight, Check, MapPin } from 'lucide-react';
import { GALLERY_PROJECTS, GalleryProject } from '../data/contractorData';

interface ProjectGallerySectionProps {
  onOpenEstimate: (projectName?: string) => void;
}

export const ProjectGallerySection: React.FC<ProjectGallerySectionProps> = ({ onOpenEstimate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);
  const [showBeforeMap, setShowBeforeMap] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'kitchen', label: 'Kitchens' },
    { id: 'bathroom', label: 'Bathrooms' },
    { id: 'addition', label: 'Additions & ADUs' },
    { id: 'deck', label: 'Custom Decks' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === activeCategory);

  const toggleBeforeAfter = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBeforeMap((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Orange County Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Recent Projects & Before/After Showcase
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Click on any project to see detailed craftsmanship notes, or toggle the Before/After button to see the transformation.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-amber-400 shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isShowingBefore = !!showBeforeMap[project.id];
            const displayImage = isShowingBefore && project.beforeImage ? project.beforeImage : project.afterImage;

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* 100% Clear High Resolution Image with zero dark overlay */}
                <div className="relative aspect-[16/11] bg-slate-900 overflow-hidden">
                  <img
                    src={displayImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
                      {project.highlight}
                    </span>

                    {project.beforeImage && (
                      <button
                        onClick={(e) => toggleBeforeAfter(project.id, e)}
                        className="pointer-events-auto inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md transition-all cursor-pointer bg-slate-900/90 text-amber-400 hover:bg-slate-900"
                        title="Toggle Before / After Photo"
                      >
                        <ArrowLeftRight className="w-3 h-3" />
                        <span>{isShowingBefore ? 'Showing BEFORE' : 'Show BEFORE'}</span>
                      </button>
                    )}
                  </div>

                  {/* Location badge */}
                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {project.location}
                    </span>
                  </div>
                </div>

                {/* Card Description */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {project.details.slice(0, 3).map((detail, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        ✓ {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Full Project Detail Inspection */}
        {activeProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              
              <div className="relative aspect-[16/10] bg-slate-900">
                <img
                  src={activeProject.afterImage}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
                  aria-label="Close project view"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold text-amber-400 bg-slate-900/90 px-3 py-1 rounded-full">
                    {activeProject.highlight} · {activeProject.location}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {activeProject.description}
                </p>

                <div className="my-5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Craftsmanship Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    {activeProject.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Supervised personally by Ben (CA Lic. #1139587)
                  </span>
                  <button
                    onClick={() => {
                      const title = activeProject.title;
                      setActiveProject(null);
                      onOpenEstimate(title);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Request Similar Remodel Quote
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
