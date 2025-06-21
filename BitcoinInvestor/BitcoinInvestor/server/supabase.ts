import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cobofqwrcmriskmzsvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvYm9mcXdyY21yaXNrbXpzdmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTYxMzAsImV4cCI6MjA2NTc3MjEzMH0.8NrUuDrxqPQ_g9czwxMrmF0NmIPMNZQ4uti8gPZ7qXY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);