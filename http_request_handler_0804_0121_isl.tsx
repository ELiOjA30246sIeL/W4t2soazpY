// 代码生成时间: 2025-08-04 01:21:53
import React, { useState } from 'react';

interface ApiResponse {
  data: any;
  error?: string;
}

const HttpRequestHandler: React.FC = () => {
  // State to store the response data and error message
  const [response, setResponse] = useState<ApiResponse>({ data: null });

  // Function to handle HTTP GET requests
  const handleGetRequest = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponse({ data });
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
  };

  return (
    <div>
      <h1>HTTP Request Handler</h1>
      <button onClick={handleGetRequest}>Fetch Data</button>
      {response.data && <pre>{JSON.stringify(response.data, null, 2)}</pre>}
      {response.error && <p style={{ color: 'red' }}>{response.error}</p>}
    </div>
  );
};

export default HttpRequestHandler;