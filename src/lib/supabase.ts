import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

export const supabase = createClient(
  "https://rtmauimnfformmaxtkfn.supabase.co",
  "sb_publishable_3p85FXy7iTrw52kp1tLYTQ_DSHVWIfr",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // VERY IMPORTANT
    },
  },
);
