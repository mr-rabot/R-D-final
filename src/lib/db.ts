
import mysql from 'mysql2/promise';

/**
 * Creates a MySQL connection pool using environment variables.
 * Falls back to localhost defaults for development.
 */
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rd_services',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Helper to execute a query.
 */
export async function query<T>(sql: string, params?: any[]): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}
