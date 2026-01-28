import { useState } from 'react';
import { X } from 'lucide-react';
import { Technology, Project } from '../App';

interface ProjectFormProps {
  technologies: Technology[];
  onSubmit: (project: Omit<Project, 'id' | 'postedDate' | 'matches'>) => void;
  onClose: () => void;
}

export function ProjectForm({ technologies, onSubmit, onClose }: ProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const handleTechToggle = (techName: string) => {
    setSelectedTech(prev =>
      prev.includes(techName)
        ? prev.filter(t => t !== techName)
        : [...prev, techName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !budget || selectedTech.length === 0) {
      alert('Please fill in all fields and select at least one technology');
      return;
    }

    onSubmit({
      title,
      description,
      budget: parseFloat(budget),
      technologies: selectedTech,
    });

    setTitle('');
    setDescription('');
    setBudget('');
    setSelectedTech([]);
  };

  return (
    


    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Post a New Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., E-commerce Website Development"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project requirements, goals, and timeline..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget (USD) *
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="5000"
              min="0"
              step="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Technologies *
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Select the technologies needed for your project. Freelancers matching at least 50% will be notified.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {technologies.map(tech => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleTechToggle(tech.name)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedTech.includes(tech.name)
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>
            {selectedTech.length > 0 && (
              <p className="text-sm text-gray-600 mt-3">
                Selected: {selectedTech.length} {selectedTech.length === 1 ? 'technology' : 'technologies'}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Post Project & Find Matches
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
