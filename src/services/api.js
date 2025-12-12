// API Service Layer
// Configure your backend URL here
const API_BASE_URL = "https://backend-xeg0.onrender.com";

// Generic fetch wrapper with auth
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('admin_token');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// API Methods - Connected to real backend

export const apiService = {
  // Dashboard
  getDashboardStats: async () => {
    try {
      // Fetch real applicants data and calculate stats
      const applicantsData = await fetchAPI('/internship/all');
      const applicants = applicantsData.map((a) => ({
        id: a._id,
        name: a.name,
        email: a.email,
        specialization: a.specialization || a.preferredDomain || 'Not specified',
        college: a.college || '',
        status: a.status || 'pending',
        submittedAt: a.submittedAt,
      }));

      // Calculate domain/specialization stats
      const domainCounts = {};
      applicants.forEach((a) => {
        const domain = a.specialization || 'Other';
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      });
      const domainStats = Object.entries(domainCounts).map(([domain, count]) => ({ domain, count }));

      // Calculate monthly applications
      const monthlyData = {};
      applicants.forEach((a) => {
        const date = new Date(a.submittedAt);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
      });
      const monthlyApplications = Object.entries(monthlyData).map(([month, applications]) => ({ month, applications }));

      // Calculate status counts
      const pendingCount = applicants.filter((a) => a.status === 'pending').length;

      return {
        totalApplicants: applicants.length,
        totalUsers: 0, // Update when users endpoint is available
        activeProjects: 0, // Update when projects endpoint is available
        pendingApplications: pendingCount,
        monthlyGrowth: 0,
        domainStats,
        monthlyApplications,
        recentApplicants: applicants.slice(0, 5),
      };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return mockDashboardStats;
    }
  },

  // Applicants
  getApplicants: async () => {
    try {
      const data = await fetchAPI('/internship/all');
      console.log('Applicants data from API:', data);
      return data.map((a) => ({
        id: a._id,
        name: a.name,
        email: a.email,
        phone: a.phone,
        qualification: a.qualification,
        passoutYear: a.passoutYear,
        branch: a.branch,
        modeOfInternship: a.modeOfInternship,
        submittedAt: a.submittedAt,
        specialization: a.preferredDomain || '',
        college: a.college || '',
        status: a.status || 'pending',
        programmingLanguages: a.programmingLanguages || '',
        experience: a.experience || 'Fresher',
        duration: a.duration || '',
        linkedIn: a.linkedIn || '',
        portfolio: a.portfolio || '',
      }));
    } catch (error) {
      console.error('Get applicants error:', error);
      return mockApplicants;
    }
  },

  updateApplicantStatus: async (id, status) => {
    try {
      return await fetchAPI(`/api/applicants/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    } catch (error) {
      console.error('Update applicant error:', error);
      const applicant = mockApplicants.find(a => a.id === id);
      if (applicant) applicant.status = status;
      return applicant;
    }
  },

  deleteApplicant: async (id) => {
    try {
      return await fetchAPI(`/api/applicants/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Delete applicant error:', error);
      const index = mockApplicants.findIndex(a => a.id === id);
      if (index > -1) mockApplicants.splice(index, 1);
    }
  },

  // Users
  getUsers: async () => {
    try {
      return await fetchAPI('/api/users');
    } catch (error) {
      console.error('Get users error:', error);
      return mockUsers;
    }
  },

  updateUserStatus: async (id, status) => {
    try {
      return await fetchAPI(`/api/users/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    } catch (error) {
      console.error('Update user error:', error);
      const user = mockUsers.find(u => u.id === id);
      if (user) user.status = status;
      return user;
    }
  },

  // Projects
  getProjects: async () => {
    try {
      return await fetchAPI('/api/projects');
    } catch (error) {
      console.error('Get projects error:', error);
      return mockProjects;
    }
  },

  createProject: async (project) => {
    try {
      return await fetchAPI('/api/projects', { method: 'POST', body: JSON.stringify(project) });
    } catch (error) {
      console.error('Create project error:', error);
      const newProject = { ...project, id: String(Date.now()) };
      mockProjects.push(newProject);
      return newProject;
    }
  },

  updateProject: async (id, project) => {
    try {
      return await fetchAPI(`/api/projects/${id}`, { method: 'PATCH', body: JSON.stringify(project) });
    } catch (error) {
      console.error('Update project error:', error);
      const existing = mockProjects.find(p => p.id === id);
      if (existing) Object.assign(existing, project);
      return existing;
    }
  },

  deleteProject: async (id) => {
    try {
      return await fetchAPI(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error('Delete project error:', error);
      const index = mockProjects.findIndex(p => p.id === id);
      if (index > -1) mockProjects.splice(index, 1);
    }
  },
};

// Mock Data - Remove when connecting to real backend
const mockApplicants = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@gmail.com', phone: '7049595389', branch: 'Computer Science', modeOfInternship: 'Remote', college: 'Sushila Devi Bansal College of Engineering', specialization: 'Salesforce Administration & Development', passoutYear: '2024', qualification: 'BTech', programmingLanguages: 'HTML, CSS, JavaScript, Apex', experience: 'Fresher', duration: '3 months', status: 'pending', submittedAt: '2025-12-01T17:06:08.997+00:00', linkedIn: 'linkedin.com/in/rahul' },
  { id: '2', name: 'Priya Patel', email: 'priya@gmail.com', phone: '9876543211', branch: 'Information Technology', modeOfInternship: 'Hybrid', college: 'NIT Trichy', specialization: 'Data Science', passoutYear: '2024', qualification: 'BTech', programmingLanguages: 'Python, R, SQL', experience: 'Fresher', duration: '6 months', status: 'approved', submittedAt: '2025-11-28T10:30:00.000+00:00', portfolio: 'priya.dev' },
  { id: '3', name: 'Amit Kumar', email: 'amit@gmail.com', phone: '9876543212', branch: 'Computer Science', modeOfInternship: 'On-site', college: 'BITS Pilani', specialization: 'Mobile Development', passoutYear: '2025', qualification: 'BTech', programmingLanguages: 'Java, Kotlin, Swift', experience: '1 year', duration: '3 months', status: 'interview', submittedAt: '2025-11-25T14:20:00.000+00:00' },
  { id: '4', name: 'Sneha Gupta', email: 'sneha@gmail.com', phone: '9876543213', branch: 'Design', modeOfInternship: 'Remote', college: 'NID Ahmedabad', specialization: 'UI/UX Design', passoutYear: '2024', qualification: 'BDes', programmingLanguages: 'Figma, Adobe XD', experience: 'Fresher', duration: '2 months', status: 'pending', submittedAt: '2025-11-20T09:15:00.000+00:00' },
  { id: '5', name: 'Vikram Singh', email: 'vikram@gmail.com', phone: '9876543214', branch: 'Computer Science', modeOfInternship: 'Remote', college: 'IISc Bangalore', specialization: 'Machine Learning', passoutYear: '2024', qualification: 'MTech', programmingLanguages: 'Python, TensorFlow, PyTorch', experience: '2 years', duration: '6 months', status: 'rejected', submittedAt: '2025-11-18T11:45:00.000+00:00' },
  { id: '6', name: 'Ananya Reddy', email: 'ananya@gmail.com', phone: '9876543215', branch: 'Information Technology', modeOfInternship: 'Hybrid', college: 'VIT Vellore', specialization: 'Cloud Computing', passoutYear: '2025', qualification: 'BTech', programmingLanguages: 'AWS, Azure, Python', experience: 'Fresher', duration: '3 months', status: 'approved', submittedAt: '2025-11-15T16:30:00.000+00:00' },
  { id: '7', name: 'Karan Mehta', email: 'karan@gmail.com', phone: '9876543216', branch: 'Computer Science', modeOfInternship: 'On-site', college: 'DTU Delhi', specialization: 'DevOps', passoutYear: '2024', qualification: 'BTech', programmingLanguages: 'Docker, Kubernetes, Jenkins', experience: '1 year', duration: '4 months', status: 'pending', submittedAt: '2025-11-10T08:00:00.000+00:00' },
  { id: '8', name: 'Pooja Verma', email: 'pooja@gmail.com', phone: '9876543217', branch: 'Computer Science', modeOfInternship: 'Remote', college: 'IIIT Hyderabad', specialization: 'Cybersecurity', passoutYear: '2025', qualification: 'BTech', programmingLanguages: 'Python, C++, Network Security', experience: 'Fresher', duration: '3 months', status: 'interview', submittedAt: '2025-11-05T13:20:00.000+00:00' },
];

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+91 9876543220', status: 'active', role: 'premium', joinedAt: '2023-06-15', lastActive: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543221', status: 'active', role: 'user', joinedAt: '2023-08-20', lastActive: '2024-01-14' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', role: 'user', joinedAt: '2023-09-10', lastActive: '2023-12-01' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+91 9876543222', status: 'blocked', role: 'user', joinedAt: '2023-07-05' },
  { id: '5', name: 'Alex Brown', email: 'alex@example.com', status: 'active', role: 'premium', joinedAt: '2023-10-12', lastActive: '2024-01-15' },
];

const mockProjects = [
  { id: '1', title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with payment integration', domain: 'Web Development', status: 'active', startDate: '2024-01-01', technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'], images: [], teamSize: 5 },
  { id: '2', title: 'AI Chatbot', description: 'Intelligent customer support chatbot using NLP', domain: 'Machine Learning', status: 'active', startDate: '2023-12-15', technologies: ['Python', 'TensorFlow', 'FastAPI'], images: [], teamSize: 3 },
  { id: '3', title: 'Mobile Fitness App', description: 'Cross-platform fitness tracking application', domain: 'Mobile Development', status: 'completed', startDate: '2023-10-01', endDate: '2024-01-10', technologies: ['React Native', 'Firebase'], images: [], teamSize: 4 },
  { id: '4', title: 'Cloud Infrastructure', description: 'Scalable cloud infrastructure setup with CI/CD', domain: 'DevOps', status: 'upcoming', startDate: '2024-02-01', technologies: ['AWS', 'Terraform', 'Jenkins'], images: [], teamSize: 2 },
];

const mockDashboardStats = {
  totalApplicants: 247,
  totalUsers: 1842,
  activeProjects: 12,
  pendingApplications: 34,
  monthlyGrowth: 23.5,
  domainStats: [
    { domain: 'Web Development', count: 78 },
    { domain: 'Data Science', count: 56 },
    { domain: 'Mobile Development', count: 42 },
    { domain: 'UI/UX Design', count: 35 },
    { domain: 'Machine Learning', count: 28 },
    { domain: 'DevOps', count: 8 },
  ],
  monthlyApplications: [
    { month: 'Aug', applications: 45 },
    { month: 'Sep', applications: 62 },
    { month: 'Oct', applications: 78 },
    { month: 'Nov', applications: 95 },
    { month: 'Dec', applications: 112 },
    { month: 'Jan', applications: 134 },
  ],
  recentApplicants: mockApplicants.slice(0, 5),
};
