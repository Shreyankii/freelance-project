import { Calendar, DollarSign, Users, Code } from 'lucide-react';
import { Project } from '../App';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-600">{project.description}</p>
        </div>
        {project.matches && project.matches.length > 0 && (
          <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {project.matches.length} {project.matches.length === 1 ? 'Match' : 'Matches'}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map(tech => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>${project.budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Posted {formatDate(project.postedDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4" />
          <span>{project.technologies.length} technologies</span>
        </div>
      </div>
    </div>
  );
}
