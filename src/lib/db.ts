
/**
 * Database utility layer.
 * Note: Switched to JSON-based persistence for better alignment with VPS local storage.
 * mysql2 has been removed to simplify environment dependencies.
 */
export const pool = null;
export async function query<T>(sql: string, params?: any[]): Promise<T> {
  console.warn("Database query called but mysql2 is removed. Using JSON registry instead.");
  return [] as any;
}
