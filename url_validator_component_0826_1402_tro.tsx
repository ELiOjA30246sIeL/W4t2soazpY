// 代码生成时间: 2025-08-26 14:02:33
// url_validator_component.tsx
// This React component is designed to validate the URL input by the user.

import React, { useState } from 'react';

interface URLValidatorProps {
  // Props interface if needed, currently empty for standalone functionality
}

const isUrlValid = (url: string): boolean => {
  // A simple regex to validate URL format
  const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return pattern.test(url);
};

const UrlValidatorComponent: React.FC<URLValidatorProps> = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the URL input state
    setUrlInput(event.target.value);
  };

  const validateUrl = () => {
    // Validate the URL and set the validity state
    if (isUrlValid(urlInput)) {
      setIsValid(true);
      setErrorMessage('');
    } else {
      setIsValid(false);
      setErrorMessage('Invalid URL format.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={urlInput}
        onChange={handleUrlChange}
        placeholder="Enter URL..."
      />
      <button onClick={validateUrl}>Validate URL</button>
      {isValid ? (
        <p style={{ color: 'green' }}>URL is valid.</p>
      ) : (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default UrlValidatorComponent;