import { createClient } from '@supabase/supabase-js';
import useAuthUser from '@/composables/useAuthUser';

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseURL, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { userAuth } = useAuthUser();

  userAuth.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
