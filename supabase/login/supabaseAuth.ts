import { supabase } from '../../src/lib/supabase';

export async function signInAdmin(email: string, password: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}
