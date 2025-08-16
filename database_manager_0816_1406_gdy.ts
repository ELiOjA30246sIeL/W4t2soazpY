// 代码生成时间: 2025-08-16 14:06:54
import { Pool, PoolConfig, PoolClient } from 'pg';

// DatabaseConfig provides the configuration for the database connection pool.
interface DatabaseConfig extends PoolConfig {
  host: string;
  port: number;
  user: string;
  database: string;
  password: string;
}

// DatabaseManager is a class responsible for managing a PostgreSQL database connection pool.
class DatabaseManager {
  private pool: Pool | undefined;

  constructor(private config: DatabaseConfig) {
    // Initialize the pool lazily when required.
  }

  // Connect to the database and create a new connection pool.
  public async connect(): Promise<void> {
    try {
      this.pool = new Pool(this.config);
      await this.pool.connect();
      console.log('Database connection pool established.');
    } catch (error) {
      console.error('Failed to establish database connection pool:', error);
      throw error;
    }
  }

  // Get a client from the pool.
  public async getClient(): Promise<PoolClient> {
    if (!this.pool) {
      throw new Error('Database pool is not initialized!');
    }
    try {
      return await this.pool.connect();
    } catch (error) {
      console.error('Failed to get a client from the pool:', error);
      throw error;
    }
  }

  // Release a client back to the pool.
  public release(client: PoolClient): void {
    if (this.pool && client) {
      client.release();
    }
  }

  // End the pool connections and release resources.
  public async end(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      console.log('Database connection pool ended.');
    }
  }
}

// Example usage of DatabaseManager with a configuration object.
const dbConfig: DatabaseConfig = {
  host: 'localhost',
  port: 5432,
  user: 'your_username',
  database: 'your_database',
  password: 'your_password',
  max: 20, // Maximum number of clients in the pool.
  idleTimeoutMillis: 30000, // Close non-used connections after 30 seconds.
};

const dbManager = new DatabaseManager(dbConfig);

// Connect to the database.
dbManager.connect().then(() => {
  // Get a client and perform operations.
  dbManager.getClient().then(client => {
    // Perform your database operations here.
    // Remember to release the client back to the pool after use.
    dbManager.release(client);
  }).catch(error => {
    console.error('Error getting client:', error);
  });
}).catch(error => {
  console.error('Error connecting to the database:', error);
});