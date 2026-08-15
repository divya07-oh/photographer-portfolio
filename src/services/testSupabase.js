import { supabase } from './supabase';

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('projects')
    .select('id')
    .limit(1);

  if (error) {
    console.error('SUPABASE ERROR:', error);
    console.error('Message:', error.message);
    console.error('Details:', error.details);
    console.error('Hint:', error.hint);
    console.error('Code:', error.code);
    return;
  }

  console.log('SUPABASE SUCCESS:', data);
}