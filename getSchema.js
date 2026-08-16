import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8');
const envVars = {};
envContent.split(/\r?\n/).forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'];
const supabaseKey = envVars['VITE_SUPABASE_PUBLISHABLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars');
  process.exit(1);
}

async function checkSchema() {
  const url = `${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Error fetching:', await res.text());
      return;
    }
    const data = await res.json();
    const projectsTable = data.definitions.projects;
    if (projectsTable) {
        console.log('Projects table schema:', Object.keys(projectsTable.properties));
    } else {
        console.log('Projects table not found in OpenAPI spec');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

checkSchema();
