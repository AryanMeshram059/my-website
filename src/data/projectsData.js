export const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard. Built with modern technologies for optimal performance.',
    image: null, // Placeholder for now
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    category: 'fullstack',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: null,
    techStack: ['React', 'TypeScript', 'Firebase', 'Framer Motion'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    category: 'frontend',
    featured: true
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
    image: null,
    techStack: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    category: 'frontend',
    featured: false
  },
  {
    id: 4,
    title: 'REST API Server',
    description: 'A scalable REST API with authentication, rate limiting, and comprehensive documentation. Includes automated testing and deployment.',
    image: null,
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    liveUrl: null,
    githubUrl: 'https://github.com/example',
    category: 'backend',
    featured: false
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website with smooth animations, glassmorphism effects, and optimized performance.',
    image: null,
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    category: 'frontend',
    featured: false
  },
  {
    id: 6,
    title: 'Social Media Dashboard',
    description: 'A comprehensive social media management platform with analytics, scheduling, and multi-platform integration.',
    image: null,
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    category: 'fullstack',
    featured: false
  }
]

export const getProjectsByCategory = (category) => {
  if (category === 'all') {
    return projectsData
  }
  return projectsData.filter(project => project.category === category)
}

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}