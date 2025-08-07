// 代码生成时间: 2025-08-07 18:14:49
import React, { useState } from 'react';

// Define a type for the component's props
interface RandomNumberGeneratorProps {
  lowerBound: number;
  upperBound: number;
}

// RandomNumberGenerator component
const RandomNumberGenerator: React.FC<RandomNumberGeneratorProps> = ({ lowerBound, upperBound }) => {
  // State to store the generated random number
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  // Function to generate a random number within the specified range
  const generateRandomNumber = (): void => {
    try {
      // Check if the range is valid
      if (lowerBound >= upperBound) {
        throw new Error('Lower bound must be less than upper bound.');
      }

      // Generate and set the random number within the range
      const num = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
      setRandomNumber(num);
    } catch (error) {
      // Handle errors, such as invalid range
      console.error('Error generating random number:', error);
      // Optionally, set an error state or display an error message to the user
    }
  };

  return (
    <div>
      {/* Display the generated random number if available */}
      {randomNumber !== null && <p>The generated random number is: {randomNumber}</p>}

      {/* Button to trigger random number generation */}
      <button onClick={generateRandomNumber}>Generate Random Number</button>
    </div>
  );
};

export default RandomNumberGenerator;
