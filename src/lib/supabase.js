import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mfcamrjfhapjiemmaplv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mY2FtcmpmaGFwamllbW1hcGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NzQ3MjksImV4cCI6MjA4NjM1MDcyOX0.BrBjuqUxyFipYXL2E2GiA0TmwQ70EbxpbpB4HkfDXAQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);