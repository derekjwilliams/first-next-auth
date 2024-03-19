import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Database} from "@/utils/database.types";

export type TypedSupabaseClient = SupabaseClient<Database> | undefined;
let client: TypedSupabaseClient;


export function getSupabaseBrowserClient() {
    
    if (client) {
      return client;
    }
    client= createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    return client;
}