import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", process.env.SUPABASE_KEY);

export default supabase;
