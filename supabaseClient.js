import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dqcwygutsfiepcbathqm.supabase.co'; // 從 Supabase 設定檔取得
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3d5Z3V0c2ZpZXBjYmF0aHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNzYxODksImV4cCI6MjA0NjY1MjE4OX0.EcmYcKIUZGXOc3PP0ViL58olwi_tCYmFRPlwVe58IAk'; // 從 Supabase 設定檔取得

export const supabase = createClient(supabaseUrl, supabaseKey);
