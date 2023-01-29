if (process.env.NODE_ENV !== "production") require("dotenv").config();

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.API_KEY
);
