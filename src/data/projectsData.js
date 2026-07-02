const githubProfile = 'https://github.com/AryanMeshram059'
import smartspend_demo from '../assets/smartspend_demo.png'
import db_demo from "../assets/db_demo.png"

export const projectsData = [
  {
    id: 1,
    title: 'SmartSpend-Ai',
    description: 'A personal finance tracker pwa with ai powered assitant',
    cardCaption: 'Live metrics, charts, and Ai Assistant',
    visual: 'dashboard',
    palette: ['#0b1f18', '#d4af37'],
    techStack: ['React', 'Node.js', 'ReCharts', 'Supabase'],
    liveUrl: 'https://smartspend-ai-brown-eta.vercel.app/',
    githubUrl: 'https://github.com/AryanMeshram059/smartspend-ai',
    category: 'Personal Project',
    image: smartspend_demo,
    featured: true
  },
  {
    id: 2,
    title: 'Attendance Management System',
    description: 'A full-stack attendance management platform supporting 3 user roles',
    cardCaption: '',
    visual: 'commerce',
    palette: ['#0b1f18', '#2cd1f6'],
    techStack: ['React', 'Tailwind CSS', 'MySQL'],
    liveUrl: "https://drive.google.com/file/d/1HSxMbX55cCmvgTl1kV7NbaYKjCu1MXkZ/view",
    githubUrl: "https://github.com/AryanMeshram059/attendance-management-system",
    category: 'course project',
    featured: true,
    image:db_demo
  },
  {
    id: 3,
    title: 'MLP vs CNN',
    description: 'Comparative study of MLP and CNN architectures for image classification on the CIFAR-10 dataset using PyTorch.',
    cardCaption: '',
    visual: 'portfolio',
    palette: ['#1c1b1b', '#a87f17'],
    techStack: ['Machine learning', 'MLP', 'CNN', 'PyTorch'],
    liveUrl: githubProfile,
    githubUrl: "https://github.com/AryanMeshram059/mlp-cnn-cifar10",
    category: 'Course Project',
    featured: false
  },
  // {
  //   id: 4,
  //   title: 'Travel Explorer',
  //   description: 'A discovery interface for immersive destination browsing with map-like visual rhythm and responsive layouts.',
  //   cardCaption: 'Destination discovery and route previews',
  //   visual: 'travel',
  //   palette: ['#10241f', '#38bdf8'],
  //   techStack: ['React', 'API Design', 'Responsive UI', 'Animation'],
  //   liveUrl: githubProfile,
  //   githubUrl: githubProfile,
  //   category: 'Frontend',
  //   featured: false
  // },
  // {
  //   id: 5,
  //   title: 'Media Studio',
  //   description: 'A creative dashboard for organizing visual content, previewing campaigns, and moving quickly between assets.',
  //   cardCaption: 'Creative operations and asset previews',
  //   visual: 'media',
  //   palette: ['#220f20', '#d4af37'],
  //   techStack: ['React', 'State Management', 'Design Systems', 'Vite'],
  //   liveUrl: githubProfile,
  //   githubUrl: githubProfile,
  //   category: 'Product UI',
  //   featured: false
  // }
]

export const getProjectsByCategory = (category) => {
  if (category === 'all') {
    return projectsData
  }
  return projectsData.filter((project) => project.category.toLowerCase() === category)
}

export const getFeaturedProjects = () => {
  return projectsData.filter((project) => project.featured)
}
