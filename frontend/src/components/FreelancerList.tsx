import { Mail, Star, DollarSign, Briefcase } from 'lucide-react';
import { Freelancer } from '../App';

interface FreelancerListProps {
  freelancers: Freelancer[];
}

export function FreelancerList({ freelancers }: FreelancerListProps) {
  const handleContactFreelancer = (email: string, freelancerName: string) => {
    const subject = encodeURIComponent('Project Opportunity');
    const body = encodeURIComponent(`Hi ${freelancerName},\n\nI'd like to discuss a potential project opportunity with you.\n\nBest regards`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">All Freelancers</h2>
        <p className="text-gray-600 mt-1">Browse our talented pool of freelancers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freelancers.map(freelancer => (
          <div
            key={freelancer.id}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4 mb-4">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {freelancer.name}
                </h3>
                <p className="text-gray-600 mb-2">{freelancer.title}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{freelancer.experience} years</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>${freelancer.hourlyRate}/hr</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 font-medium mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {freelancer.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleContactFreelancer(freelancer.email, freelancer.name)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact via Email
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
