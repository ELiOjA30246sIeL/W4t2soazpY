// 代码生成时间: 2025-08-08 12:53:54
import React, { useState } from 'react';

// Define a type for API response data
interface ApiResponseData {
  data: any;
  status: number;
  statusText: string;
}

interface ApiResponseFormatterProps {
  responseData: ApiResponseData;
}

// The API Response Formatter component takes API response data and displays it in a formatted manner
const ApiResponseFormatter: React.FC<ApiResponseFormatterProps> = ({ responseData }) => {
  const [formattedData, setFormattedData] = useState<string>(JSON.stringify(responseData.data, null, 2));
  const [error, setError] = useState<string | null>(null);

  // Function to format data as JSON string
  const formatData = (data: any): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      setError('Error formatting data: ' + (e instanceof Error ? e.message : 'Unknown error'));
      return '';
    }
  };

  // Handle changes to the formatted data
  const handleDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFormattedData(event.target.value);
  };

  // Render the component
  return (
    <div>
      <h2>API Response Formatter</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea
        value={formattedData}
        onChange={handleDataChange}
        style={{
          width: '100%',
          height: '300px',
          margin: '10px 0',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          resize: 'vertical',
        }}
      />
      {responseData.status !== 200 && <p>
        Status: {responseData.status} {responseData.statusText}
      </p>}
    </div>
  );
};

export default ApiResponseFormatter;