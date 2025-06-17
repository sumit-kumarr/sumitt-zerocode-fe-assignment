
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zggeujmenxrwhnczqhmf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZ2V1am1lbnhyd2huY3pxaG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTU3NDQsImV4cCI6MjA2NTc3MTc0NH0.tP--psoPbxEqEUTzKXT_9jt0wZzSy8gzFwXadMcS-mQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  user_id: string;
  chat_session_id: string;
}

export interface ChatSession {
  id: string;
  title: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
