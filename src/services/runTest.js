import { testSupabaseConnection } from './testSupabase.js';
import { fetchFeaturedProjects, fetchProjectById } from '../data/portfolioService.js';
import { projectService } from './projectService.js';

async function test() {
  console.log('Testing projectService.getProjects()...');
  const projects = await projectService.getProjects();
  console.log(JSON.stringify(projects, null, 2));
  
  console.log('\nTesting fetchFeaturedProjects()...');
  const featured = await fetchFeaturedProjects();
  console.log(JSON.stringify(featured, null, 2));
}

test();
