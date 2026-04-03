import { createClient } from '@supabase/supabase-js';

// Supabase 项目配置 - v2 (anon key 是公开安全的，可以放前端)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://radypjzuikwasqeofxqc.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZHlwanp1aWt3YXNxZW9meHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMjQwMDksImV4cCI6MjA5MDgwMDAwOX0.xvqR4Px-FhzKzcgB32tfSsq7-7T2RPTZzJXlVxGCaxs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
