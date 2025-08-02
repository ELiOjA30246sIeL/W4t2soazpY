// 代码生成时间: 2025-08-02 15:48:58
import React, { useState } from 'react';

interface RandomNumberGeneratorProps {
  min: number;
  max: number;
}

const RandomNumberGenerator: React.FC<RandomNumberGeneratorProps> = ({ min, max }) => {
  // State to store the generated random number
  const [randomNumber, setRandomNumber] = useState<number>(0);
  
  // Function to generate a random number within the specified range
  const generateRandomNumber = (): void => {
    if (min >= max) {
      console.error('Error: Minimum value must be less than maximum value.');
      return;
    }
    
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(num);
  };

  // Handler for the generate button click
  const handleGenerateClick = (): void => {
    generateRandomNumber();
  };

  return (
    <div>
      <h2>Random Number Generator</h2>
      <p>Random number between {min} and {max}:</p>
      <p>{randomNumber}</p>
      <button onClick={handleGenerateClick}>Generate</button>
    </div>
  );
};

RandomNumberGenerator.defaultProps = {
  min: 0,
  max: 100,
};

export default RandomNumberGenerator;