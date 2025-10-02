// 代码生成时间: 2025-10-02 19:16:54
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the License model
interface License {
  id: number;
  name: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}

// Define the API response structure
interface ApiResponse {
  data: License[];
  message: string;
  success: boolean;
}

// Define the API error structure
interface ApiError {
  message: string;
  status: number;
}

const LicenseManagementSystem: React.FC = () => {
  // State to hold licenses
  const [licenses, setLicenses] = useState<License[]>([]);
  // State to hold loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to hold API errors
  const [error, setError] = useState<string>("");

  // Fetch licenses from the server
  useEffect(() => {
    axios.get<ApiResponse>("/api/licenses")
      .then((response) => {
        setLicenses(response.data.data);
        setIsLoading(false);
      }).catch((error: ApiError) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Render the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the licenses table
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Expiry Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {licenses.map((license) => (
          <tr key={license.id}>
            <td>{license.id}</td>
            <td>{license.name}</td>
            <td>{license.expiryDate}</td>
            <td className={license.status}>{license.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LicenseManagementSystem;