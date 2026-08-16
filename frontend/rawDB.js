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
  console.log('Fetching projects directly from DB with join...');
  const res = await fetch(`${supabaseUrl}/rest/v1/projects?select=*,project_images(*)`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });
  const projects = await res.json();
  console.log(JSON.stringify(projects, null, 2));
}

checkData();
