// 代码生成时间: 2025-08-24 09:04:45
import React, { useState } from 'react';
import DOMPurify from 'dompurify';

// Interface for the AppState to hold the input and sanitized value
interface AppState {
  input: string;
  sanitizedOutput: string;
}

// Functional component to implement XSS protection
const XssProtectionApp: React.FC = () => {
  // State to store user input and its sanitized output
  const [state, setState] = useState<AppState>({
    input: '',
    sanitizedOutput: '',
  });

  // Handle input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({
      ...prevState,
      input: event.target.value,
    }));
  };

  // Sanitize the input to protect against XSS attacks
  const sanitizeInput = () => {
    try {
      const sanitized = DOMPurify.sanitize(state.input);
      setState((prevState) => ({
        ...prevState,
        sanitizedOutput: sanitized,
      }));
    } catch (error) {
      console.error('Error sanitizing input:', error);
      // Handle error, e.g., by setting sanitizedOutput to an error message
      setState((prevState) => ({
        ...prevState,
        sanitizedOutput: 'Error sanitizing input, please check your input.',
      }));
    }
  };

  return (
    <div>
      {/* Input area for user to enter potentially malicious content */}
      <textarea
        value={state.input}
        onChange={handleInputChange}
        placeholder='Enter your content here...'
        rows={4}
        cols={50}
      />
      {/* Button to trigger sanitization */}
      <button onClick={sanitizeInput}>Sanitize Input</button>
      {/* Display sanitized output */}
      <div dangerouslySetInnerHTML={{ __html: state.sanitizedOutput }} />
    </div>
  );
};

export default XssProtectionApp;
