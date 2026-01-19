
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gifxlhudmkoosxrbdstn.supabase.co';
const supabaseKey = 'sb_publishable_LkLrbWFtH3l0r6uMaO2yjQ_MXqyHcwr_';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Define TableStatus type for schema verification
export type TableStatus = Record<string, boolean>;

/**
 * Verifies connection to Supabase.
 * If the 'projects' table doesn't exist yet, it handles the error gracefully
 * but confirms the client is authorized.
 * Updated to return schema health information.
 */
export const testConnection = async () => {
  const tables = ['profiles', 'projects', 'daily_logs', 'materials', 'inspections'];
  const statusMap: TableStatus = {};
  let fullSync = true;

  try {
    // Probe each table to check for existence (404 status indicates missing table)
    for (const table of tables) {
      const { status: httpStatus } = await supabase.from(table).select('id').limit(1);
      const exists = httpStatus !== 404;
      statusMap[table] = exists;
      if (!exists) fullSync = false;
    }
    
    return { success: true, fullSync, status: statusMap };
  } catch (err: any) {
    console.error("Supabase Connection Error:", err.message);
    // Ensure status object is populated even on failure
    tables.forEach(t => { if (statusMap[t] === undefined) statusMap[t] = false; });
    return { success: false, error: err.message, fullSync: false, status: statusMap };
  }
};
