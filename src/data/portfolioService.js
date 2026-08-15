// Mock Data Service
import React from 'react';
import { projectService } from '../services/projectService';

export const CATEGORIES = ['ALL', 'WEDDING', 'ENGAGEMENT', 'MATERNITY', 'BIRTHDAY CELEBRATION'];

export const PROJECTS = [
  {
    id: '1',
    title: 'The Coastal Wedding',
    category: 'WEDDING',
    year: '2023',
    description: 'A beautiful, intimate coastal wedding captured with natural light, focusing on the raw emotion of the day.',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80',
    ]
  },
  {
    id: '2',
    title: 'Midnight in Paris',
    category: 'ENGAGEMENT',
    year: '2024',
    description: 'High-fashion editorial shoot capturing the essence of Parisian nightlife with a cinematic touch.',
    coverImage: 'https://images.unsplash.com/photo-1492633423870-43d1cd2a4507?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80',
    ]
  },
  {
    id: '3',
    title: 'Studio Portraits',
    category: 'MATERNITY',
    year: '2024',
    description: 'Minimalist studio portraits focusing on deep contrasts and raw vulnerability.',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80',
    ]
  },
  {
    id: '4',
    title: 'Summer Solstice Festival',
    category: 'BIRTHDAY CELEBRATION',
    year: '2023',
    description: 'Documenting the vibrant energy and cultural heritage of the annual summer solstice festival.',
    coverImage: 'https://images.unsplash.com/photo-1533174000255-1638210168eb?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80',
    ]
  },
  {
    id: '5',
    title: 'Morning Routine',
    category: 'WEDDING',
    year: '2023',
    description: 'A cozy lifestyle shoot capturing the quiet, beautiful moments of a slow morning.',
    coverImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80',
    ]
  },
  {
    id: '6',
    title: 'Golden Hour Elopement',
    category: 'WEDDING',
    year: '2024',
    description: 'An intimate elopement in the mountains during the perfect golden hour light.',
    coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80',
    ]
  }
];

export const SERVICES = [
  {
    id: 'traditional',
    title: 'TRADITIONAL PHOTOGRAPHY',
    description: 'Professional traditional photography capturing important ceremonies and meaningful moments.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
  },
  {
    id: 'candid',
    title: 'CANDID PHOTOGRAPHY',
    description: 'Natural, authentic moments captured without forced poses.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80',
  },
  {
    id: 'videography',
    title: 'CANDID VIDEOGRAPHY',
    description: 'Cinematic video coverage focused on genuine emotions and memorable moments.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80',
  },
  {
    id: 'album',
    title: 'ALBUM',
    description: 'Premium album design and presentation that preserves the most important memories beautifully.',
    image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2a4507?auto=format&fit=crop&q=80',
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "The photos are absolutely breathtaking. They didn't just capture how the day looked, but exactly how it felt. A true artist.",
    author: "Emma & James",
    category: "Wedding Photography"
  },
  {
    id: 2,
    quote: "Working together was a dream. The editorial campaign exceeded all expectations and brought our brand vision to life perfectly.",
    author: "Sarah Jenkins, Creative Director",
    category: "Editorial Photography"
  },
  {
    id: 3,
    quote: "I usually hate having my picture taken, but the session felt so natural and the results are the best portraits I've ever had.",
    author: "Michael T.",
    category: "Portrait Photography"
  }
];

// Helper to convert projectService format to public portfolio format
const mapToPortfolio = (project) => {
  if (!project) return null;
  // Fallback to first image if no coverImage
  const coverImage = project.coverImage || (project.images && project.images.length > 0 ? project.images[0].image_url : '');
  const gallery = project.images ? project.images.map(img => img.image_url) : [];
  
  return {
    ...project,
    coverImage,
    gallery
  };
};

export const fetchFeaturedProjects = async () => {
  try {
    const projects = await projectService.getProjects();
    return projects.slice(0, 4).map(mapToPortfolio);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return []; // Return empty array on error so UI doesn't crash
  }
};

export const fetchProjectById = async (id) => {
  try {
    const project = await projectService.getProjectById(id);
    return mapToPortfolio(project);
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null;
  }
};

export const fetchProjectsByCategory = async (category) => {
  try {
    const projects = await projectService.getProjects();
    const mapped = projects.map(mapToPortfolio);
    if (category === 'ALL') return mapped;
    return mapped.filter(p => p.category.toUpperCase() === category.toUpperCase());
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
};
