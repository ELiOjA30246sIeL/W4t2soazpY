// 代码生成时间: 2025-09-10 07:18:35
 * This tool provides a simple interface to monitor system performance.
 */
import React, { useState, useEffect } from 'react';

// Interfaces for typechecking
interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
}

// Constants for API endpoint and interval
const API_ENDPOINT = '/api/system/metrics';
const UPDATE_INTERVAL = 1000; // Update metrics every second

// Function to fetch system metrics from the API
const fetchSystemMetrics = async (): Promise<SystemMetrics> => {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error('Failed to fetch system metrics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching system metrics:', error);
    throw error;
  }
};

// Component to display system performance
const SystemPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Effect to update system metrics at regular intervals
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const newMetrics = await fetchSystemMetrics();
        setMetrics(newMetrics);
      } catch (error) {
        setError('Failed to update system metrics');
      }
    }, UPDATE_INTERVAL);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Render component
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!metrics) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>System Performance Monitor</h1>
      <div>CPU Usage: {metrics.cpu}%</div>
      <div>Memory Usage: {metrics.memory}%</div>
      <div>Disk Usage: {metrics.disk}%</div>
    </div>
  );
};

export default SystemPerformanceMonitor;