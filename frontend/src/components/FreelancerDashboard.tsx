import { Mail, Calendar, DollarSign, Code, Briefcase, Star, Settings } from 'lucide-react';

interface FreelancerProfile {
  title: string;
  bio: string;
  experience: number;
  hourlyRate: number;
  technologies: string[];
  availability: 'full-time' | 'part-time' | 'contract';
}

interface ProjectMatch {
  id: string;
  title: string;
  description: string;
  budget: number;
  technologies: string[];
  postedDate: Date;
  clientName: string;
  clientEmail: string;
  matchPercentage: number;
}

// ✅ NEW: basic project type for all projects list
interface SimpleProject {
  id: string;
  title: string;
  description: string;
  budget: number;
  technologies: string[];
  postedDate: Date;
}

interface FreelancerDashboardProps {
  profile: FreelancerProfile;
  matches: ProjectMatch[];
  allProjects: SimpleProject[]; // ✅ NEW
  onEditProfile: () => void;
}

export function FreelancerDashboard({ profile, matches, allProjects, onEditProfile }: FreelancerDashboardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleContactClient = (clientEmail: string, clientName: string, projectTitle: string) => {
    const subject = encodeURIComponent(`Application for: ${projectTitle}`);
    const body = encodeURIComponent(
      `Hi ${clientName},\n\nI'm interested in your project "${projectTitle}". With my ${profile.experience} years of experience and expertise in ${profile.technologies.join(', ')}, I believe I can deliver excellent results.\n\nMy hourly rate is $${profile.hourlyRate}.\n\nI'd love to discuss this opportunity further.\n\nBest regards`
    );
    window.open(`mailto:${clientEmail}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h2>
          <p className="text-gray-600 mt-1">Your profile and project matches</p>
        </div>
        <button
          onClick={onEditProfile}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{profile.title}</h3>
            <p className="text-blue-100 mb-4 max-w-2xl">{profile.bio}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{profile.experience} years experience</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>${profile.hourlyRate}/hour</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="capitalize">{profile.availability.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-blue-100 mb-2">Your Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {profile.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Project Matches</p>
              <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Skills</p>
              <p className="text-2xl font-bold text-gray-900">{profile.technologies.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Match</p>
              <p className="text-2xl font-bold text-gray-900">
                {matches.length > 0
                  ? Math.round(matches.reduce((sum, m) => sum + m.matchPercentage, 0) / matches.length)
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matched Projects */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Matching Projects ({matches.length})</h3>

        {matches.length === 0 ? (
          <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-900 mb-2">No matches yet</h4>
            <p className="text-gray-600 mb-4">
              We'll notify you when projects matching your skills are posted
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">{match.title}</h4>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {match.matchPercentage}% Match
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{match.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 font-medium mb-2">Required Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.technologies.map((tech) => {
                      const isYourSkill = profile.technologies.includes(tech);
                      return (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isYourSkill
                              ? 'bg-green-100 text-green-800 font-medium'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tech}
                          {isYourSkill && ' ✓'}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>${match.budget.toLocaleString()} budget</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Posted {formatDate(match.postedDate)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleContactClient(match.clientEmail, match.clientName, match.title)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ NEW: All Projects Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">All Projects ({allProjects.length})</h3>

        {allProjects.length === 0 ? (
          <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">No projects available right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allProjects.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <h4 className="text-lg font-semibold text-gray-900">{p.title}</h4>
                <p className="text-gray-600 mt-1">{p.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {p.technologies.map((t) => (
                    <span key={t} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${p.budget.toLocaleString()} budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {formatDate(p.postedDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
