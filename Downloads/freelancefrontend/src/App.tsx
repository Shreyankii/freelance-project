import { useState, useEffect } from 'react';
import { ClientDashboard } from './components/ClientDashboard';
import { FreelancerList } from './components/FreelancerList';
import { ProjectForm } from './components/ProjectForm';
import { NotificationPanel } from './components/NotificationPanel';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { FreelancerProfile } from './components/FreelancerProfile';
import { FreelancerDashboard } from './components/FreelancerDashboard';
import { Briefcase, LogOut } from 'lucide-react';

const API_BASE = '';

export interface Technology {
  id: string;
  name: string;
}

export interface Freelancer {
  id: string;
  name: string;
  email: string;
  title: string;
  technologies: string[];
  hourlyRate: number;
  experience: number;
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  technologies: string[];
  postedDate: Date;
  matches?: Freelancer[];
}

export interface Notification {
  id: string;
  projectId: string;
  projectTitle: string;
  freelancer: Freelancer;
  timestamp: Date;
}

export type BackendUserType = 'CLIENT' | 'FREELANCER';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: BackendUserType;
}

export interface FreelancerProfileData {
  title: string;
  bio: string;
  experience: number;
  hourlyRate: number;
  technologies: string[];
  availability: 'full-time' | 'part-time' | 'contract';
  avatar?: string;

}

export interface ProjectMatch {
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

const availableTechnologies: Technology[] = [
  { id: '1', name: 'React' },
  { id: '2', name: 'Node.js' },
  { id: '3', name: 'Python' },
  { id: '4', name: 'TypeScript' },
  { id: '5', name: 'MongoDB' },
  { id: '6', name: 'PostgreSQL' },
  { id: '7', name: 'Next.js' },
  { id: '8', name: 'Vue.js' },
  { id: '9', name: 'Django' },
  { id: '10', name: 'AWS' },
  { id: '11', name: 'Docker' },
  { id: '12', name: 'GraphQL' },
];

const mockFreelancers: Freelancer[] = [
  {
    id: '1',
    name: 'Ankita',
    email: 'sarah.j@example.com',
    title: 'Full Stack Developer',
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    hourlyRate: 85,
    experience: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Raj',
    email: 'mchen@example.com',
    title: 'Backend Specialist',
    technologies: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    hourlyRate: 95,
    experience: 7,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'Shyamala',
    email: 'emily.r@example.com',
    title: 'React Developer',
    technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL'],
    hourlyRate: 80,
    experience: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    id: '4',
    name: 'Akhil',
    email: 'david.kim@example.com',
    title: 'DevOps Engineer',
    technologies: ['AWS', 'Docker', 'Node.js', 'Python'],
    hourlyRate: 100,
    experience: 6,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
  {
    id: '5',
    name: 'Shreyank',
    email: 'lisa.a@example.com',
    title: 'Frontend Developer',
    technologies: ['Vue.js', 'TypeScript', 'GraphQL'],
    hourlyRate: 75,
    experience: 3,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
  },
  {
    id: '6',
    name: 'Saurabh',
    email: 'jwilson@example.com',
    title: 'Full Stack Engineer',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    hourlyRate: 90,
    experience: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [view, setView] = useState<'dashboard' | 'freelancers'>('dashboard');

  const [projects, setProjects] = useState<Project[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [freelancerProfile, setFreelancerProfile] = useState<FreelancerProfileData | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [allFreelancers, setAllFreelancers] = useState<Freelancer[]>([]);

  // ✅ NEW: Store/Update users list in localStorage so client can see names
  const upsertLocalUser = (u: User) => {
    const users = JSON.parse(localStorage.getItem('freelanceMatch_users') || '[]');
    const idx = users.findIndex((x: any) => x.id === u.id);
    if (idx >= 0) users[idx] = u;
    else users.push(u);
    localStorage.setItem('freelanceMatch_users', JSON.stringify(users));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('freelanceMatch_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('freelanceMatch_profiles') || '{}');
    const storedUsers = JSON.parse(localStorage.getItem('freelanceMatch_users') || '[]');

    const registeredFreelancers: Freelancer[] = Object.entries(storedProfiles).map(
      ([userId, profile]: [string, any]) => {
        const u = storedUsers.find((x: any) => x.id === userId);
      return {
  id: userId,
  name: u?.name || 'Unknown',
  email: u?.email || '',
  title: profile.title,
  technologies: profile.technologies,
  hourlyRate: profile.hourlyRate,
  experience: profile.experience,
  avatar: profile.avatar || 'https://via.placeholder.com/150',
};

      }
    );

    setAllFreelancers([...registeredFreelancers, ...mockFreelancers]);
  }, [freelancerProfile]);

  useEffect(() => {
    if (user && user.userType === 'FREELANCER') {
      const storedProfiles = JSON.parse(localStorage.getItem('freelanceMatch_profiles') || '{}');
      const profile = storedProfiles[user.id];
      if (profile) setFreelancerProfile(profile);
    }
  }, [user]);

  useEffect(() => {
    const storedProjects = localStorage.getItem('freelanceMatch_projects');
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      const projectsWithDates = parsedProjects.map((p: any) => ({
        ...p,
        postedDate: new Date(p.postedDate),
      }));
      setProjects(projectsWithDates);
    }
  }, []);

  // ✅ BACKEND LOGIN
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Login failed');
        return;
      }

      setUser(data);
      upsertLocalUser(data); // ✅ NEW
      localStorage.setItem('freelanceMatch_user', JSON.stringify(data));
    } catch {
      alert('Server not reachable. Is Spring Boot running on 8080?');
    }
  };

  // ✅ BACKEND REGISTER
  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    userType: 'client' | 'freelancer'
  ) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          userType: userType.toUpperCase(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Registration failed');
        return;
      }

      setUser(data);
      upsertLocalUser(data); // ✅ NEW
      localStorage.setItem('freelanceMatch_user', JSON.stringify(data));
    } catch {
      alert('Server not reachable. Is Spring Boot running on 8080?');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFreelancerProfile(null);
    localStorage.removeItem('freelanceMatch_user');
    setProjects([]);
    setNotifications([]);
  };

  const findMatchingFreelancers = (projectTechnologies: string[]): Freelancer[] => {
    return allFreelancers.filter((freelancer) => {
      const matchCount = projectTechnologies.filter((tech) => freelancer.technologies.includes(tech)).length;
      return matchCount >= Math.ceil(projectTechnologies.length * 0.5);
    });
  };

  const handleCreateProject = (projectData: Omit<Project, 'id' | 'postedDate' | 'matches'>) => {
    if (!user) return;

    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      postedDate: new Date(),
    };

    const matchedFreelancers = findMatchingFreelancers(projectData.technologies);
    newProject.matches = matchedFreelancers;

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem('freelanceMatch_projects', JSON.stringify(updatedProjects));

    const newNotifications: Notification[] = matchedFreelancers.map((freelancer) => ({
      id: `${newProject.id}-${freelancer.id}`,
      projectId: newProject.id,
      projectTitle: newProject.title,
      freelancer,
      timestamp: new Date(),
    }));

    setNotifications((prev) => [...newNotifications, ...prev]);
    setShowProjectForm(false);
  };

  const handleSaveFreelancerProfile = (profileData: FreelancerProfileData) => {
  if (!user) return;

  setFreelancerProfile(profileData);

  const storedProfiles = JSON.parse(localStorage.getItem('freelanceMatch_profiles') || '{}');
  storedProfiles[user.id] = profileData;
  localStorage.setItem('freelanceMatch_profiles', JSON.stringify(storedProfiles));

  setShowEditProfile(false);
};


  const findMatchingProjects = (): ProjectMatch[] => {
    if (!freelancerProfile) return [];

    return projects
      .map((project) => {
        const matchCount = project.technologies.filter((tech) => freelancerProfile.technologies.includes(tech)).length;
        const matchPercentage = Math.round((matchCount / project.technologies.length) * 100);

        return {
          id: project.id,
          title: project.title,
          description: project.description,
          budget: project.budget,
          technologies: project.technologies,
          postedDate: project.postedDate,
          clientName: 'Client',
          clientEmail: user?.email || '',
          matchPercentage,
        };
      })
      .filter((match) => match.matchPercentage >= 50)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };

  const handleDismissNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  if (!user) {
    if (authView === 'login') {
      return <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} />;
    }
    return <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">FreelanceMatch</h1>
            </div>

            <div className="flex items-center gap-4">
              {user.userType === 'CLIENT' && (
                <nav className="flex gap-4">
                  <button
                    onClick={() => setView('dashboard')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setView('freelancers')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      view === 'freelancers' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Freelancers
                  </button>
                </nav>
              )}

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.userType.toLowerCase()}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.userType === 'CLIENT' ? (
          <div className="flex gap-8">
            <div className="flex-1">
              {view === 'dashboard' ? (
                <ClientDashboard projects={projects} onCreateProject={() => setShowProjectForm(true)} />
              ) : (
                <FreelancerList freelancers={allFreelancers} />
              )}
            </div>

            {view === 'dashboard' && (
              <div className="w-96">
                <NotificationPanel notifications={notifications} onDismiss={handleDismissNotification} />
              </div>
            )}
          </div>
        ) : (
          <>
            {!freelancerProfile || showEditProfile ? (
              <FreelancerProfile
                technologies={availableTechnologies}
                initialData={freelancerProfile || undefined}
                onSave={handleSaveFreelancerProfile}
              />
            ) : (
            <FreelancerDashboard
             profile={freelancerProfile}
              matches={findMatchingProjects()}
               allProjects={projects}                
                onEditProfile={() => setShowEditProfile(true)}
              />

            )}
          </>
        )}
      </main>

      {showProjectForm && user.userType === 'CLIENT' && (
        <ProjectForm
          technologies={availableTechnologies}
          onSubmit={handleCreateProject}
          onClose={() => setShowProjectForm(false)}
        />
      )}
    </div>
  );
}
