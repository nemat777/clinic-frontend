// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycpruiqjrwrdqqzmyech.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcHJ1aXFqcndyZHFxem15ZWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODM0NTMsImV4cCI6MjA4NzQ1OTQ1M30.iJK8-DnWem1y_JkrN7yQKqjbkwVSkXycBp0cWY3DLMg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)