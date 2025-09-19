// 代码生成时间: 2025-09-20 00:34:31
 * This component provides a user interface to format API responses.
 * It allows users to input a JSON object and return a formatted version.
 */

import React, { useState, useEffect } from 'react';

// Interface for the API response data type
interface ApiResponse {
  [key: string]: any;
}

// Component to handle API response formatting
const ApiResponseFormatter: React.FC = () => {
  // State to hold the input string
  const [inputJson, setInputJson] = useState<string>('{}');
  // State to hold the formatted JSON string
  const [formattedJson, setFormattedJson] = useState<string>('{}');
  // State to hold any error messages
  const [error, setError] = useState<string>(null);

  // Function to handle JSON formatting
  const formatJson = (jsonString: string): ApiResponse | null => {
    try {
      const parsedJson = JSON.parse(jsonString);
      return parsedJson;
    } catch (e) {
      setError('Invalid JSON input');
      return null;
    }
  };

  // Effect to handle formatting on input change
  useEffect(() => {
    const formatted = formatJson(inputJson);
    if (formatted !== null) {
      setFormattedJson(JSON.stringify(formatted, null, 2));
    }
  }, [inputJson]);

  // Handle input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputJson(event.target.value);
  };

  return (
    <div>
      <h1>API Response Formatter</h1>
      <textarea
        value={inputJson}
        onChange={handleInputChange}
        placeholder='Enter your JSON here...'
        rows={10}
        cols={50}
      />
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <h2>Formatted JSON</h2>
      <pre>{formattedJson}</pre>
    </div>
  );
};

export default ApiResponseFormatter;