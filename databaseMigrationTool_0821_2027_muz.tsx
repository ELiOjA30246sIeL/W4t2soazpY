// 代码生成时间: 2025-08-21 20:27:19
import React, { useState } from 'react';
import { MigrationService } from './services/MigrationService'; // Import the MigrationService for database operations
import { Alert } from './components/Alert'; // Import Alert component for showing messages

// Interface for the migration data
interface MigrationData {
    version: string;
    migrationPath: string;
}

// Main component for the database migration tool
const DatabaseMigrationTool: React.FC = () => {
    const [migrationData, setMigrationData] = useState<MigrationData>({ version: '', migrationPath: '' });
    const [message, setMessage] = useState<string>(null);

    // Handle changes to the migration data inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMigrationData({ ...migrationData, [name]: value });
    };

    // Handle the migration process
    const handleMigration = async () => {
        try {
            // Validate the migration data
            if (!migrationData.version || !migrationData.migrationPath) {
                throw new Error('Migration version and path are required.');
            }

            // Perform the migration using the MigrationService
            await MigrationService.migrateDatabase(migrationData.version, migrationData.migrationPath);
            setMessage('Migration successful!');
        } catch (error) {
            setMessage('Migration failed: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Database Migration Tool</h1>
            <Alert message={message} />
            <div>
                <label>
                    Version:
                    <input
                        type='text'
                        name='version'
                        value={migrationData.version}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Migration Path:
                    <input
                        type='text'
                        name='migrationPath'
                        value={migrationData.migrationPath}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button onClick={handleMigration}>Migrate</button>
        </div>
    );
};

export default DatabaseMigrationTool;
