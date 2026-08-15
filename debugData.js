import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  if (line && line.includes('=')) {
    const [key, val] = line.split('=');
    env[key.trim()] = val.trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_PUBLISHABLE_KEY'];

async function checkData() {
  const res = await fetch(`${supabaseUrl}/rest/v1/projects?select=*`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  const projects = await res.json();
  console.log('Projects:', JSON.stringify(projects, null, 2));

  const res2 = await fetch(`${supabaseUrl}/rest/v1/project_images?select=*`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  const images = await res2.json();
  console.log('Images:', JSON.stringify(images, null, 2));
}

checkData();
