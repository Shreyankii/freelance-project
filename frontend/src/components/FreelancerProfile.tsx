import { useState } from 'react';
import { Briefcase, DollarSign, Save } from 'lucide-react';
import { Technology } from '../App';

interface FreelancerProfileData {
  title: string;
  bio: string;
  experience: number;
  hourlyRate: number;
  technologies: string[];
  availability: 'full-time' | 'part-time' | 'contract';
  avatar?: string; // ✅ NEW
}

interface FreelancerProfileProps {
  technologies: Technology[];
  initialData?: FreelancerProfileData;
  onSave: (data: FreelancerProfileData) => void;
}

export function FreelancerProfile({ technologies, initialData, onSave }: FreelancerProfileProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [bio, setBio] = useState(initialData?.bio || '');
  const [experience, setExperience] = useState(initialData?.experience?.toString() || '');
  const [hourlyRate, setHourlyRate] = useState(initialData?.hourlyRate?.toString() || '');
  const [selectedTech, setSelectedTech] = useState<string[]>(initialData?.technologies || []);
  const [availability, setAvailability] = useState<'full-time' | 'part-time' | 'contract'>(
    initialData?.availability || 'full-time'
  );

  // ✅ avatar
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar || '');
  const [uploading, setUploading] = useState(false);

  const handleTechToggle = (techName: string) => {
    setSelectedTech(prev => (prev.includes(techName) ? prev.filter(t => t !== techName) : [...prev, techName]));
  };

  // ✅ Upload image to backend
  const uploadAvatar = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/files/avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Upload failed');
        return;
      }

      // backend returns: { url: "/uploads/xxxx.jpg" }
      // convert to absolute URL for display
      setAvatarUrl(`http://localhost:8080${data.url}`);
    } catch (e) {
      alert('Upload failed. Is backend running?');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !bio || !experience || !hourlyRate || selectedTech.length === 0) {
      alert('Please fill in all required fields and select at least one technology');
      return;
    }

    if (parseInt(experience) < 0 || parseInt(hourlyRate) < 0) {
      alert('Experience and hourly rate must be positive numbers');
      return;
    }

    onSave({
      title,
      bio,
      experience: parseInt(experience),
      hourlyRate: parseInt(hourlyRate),
      technologies: selectedTech,
      availability,
      avatar: avatarUrl, // ✅ SAVE avatar URL
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600">Tell us about yourself to start receiving project matches</p>
          </div>

          {/* ✅ Avatar Upload */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <img
              src={avatarUrl || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />

            <label className="text-sm text-blue-600 cursor-pointer">
              {uploading ? 'Uploading...' : 'Upload Profile Photo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadAvatar(file);
                }}
              />
            </label>

            <p className="text-xs text-gray-500">JPG/PNG, max 5MB</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Upload */}
<div className="flex flex-col items-center gap-3">
  <img
    src={avatarUrl || "https://via.placeholder.com/150"}
    alt="Profile"
    className="w-28 h-28 rounded-full object-cover border"
  />

  <label className="cursor-pointer text-sm text-blue-600 hover:underline">
    Change Profile Photo
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) uploadAvatar(file);
      }}
    />
  </label>
</div>

            {/* Professional Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Full Stack Developer, UI/UX Designer"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio *</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell clients about your experience, skills, and what makes you unique..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">{bio.length} characters</p>
            </div>

            {/* Experience and Hourly Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="5"
                  min="0"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="75"
                    min="0"
                    step="5"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Availability *</label>
              <div className="grid grid-cols-3 gap-3">
                {(['full-time', 'part-time', 'contract'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAvailability(type)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                      availability === type
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {type.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Technology Expertise *</label>
              <p className="text-sm text-gray-600 mb-3">
                Select all technologies you're proficient in. You'll be matched with projects requiring these skills.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {technologies.map((tech) => (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => handleTechToggle(tech.name)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
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

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                {initialData ? 'Update Profile' : 'Save Profile & Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
