// 代码生成时间: 2025-09-05 20:58:09
import React, { useState } from 'react';

interface SortAlgorithmProps {
  array: number[];
  compare: (a: number, b: number) => number;
}

// A generic sorting function that uses a provided compare function
const sortAlgorithm = ({ array, compare }: SortAlgorithmProps): number[] => {
  if (!Array.isArray(array) || array.some(item => typeof item !== 'number')) {
    throw new Error('Invalid input: array must be an array of numbers');
  }
  const sortedArray = [...array].sort(compare);
  return sortedArray;
};

const SortingAlgorithmApp: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([5, 2, 8, 3, 1, 6, 4]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Compare function for ascending order
  const compareAscending = (a: number, b: number): number => {
    return a - b;
  };

  // Compare function for descending order
  const compareDescending = (a: number, b: number): number => {
    return b - a;
  };

  // Sort the numbers array based on the current sort order
  const sortedNumbers = React.useMemo(() => {
    return sortOrder === 'asc' ?
      sortAlgorithm({ array: numbers, compare: compareAscending }) :
      sortAlgorithm({ array: numbers, compare: compareDescending });
  }, [numbers, sortOrder]);

  return (
    <div>
      <h1>Sorting Algorithm Visualization</h1>
      <button onClick={() => setSortOrder('asc')}>Sort Ascending</button>
      <button onClick={() => setSortOrder('desc')}>Sort Descending</button>
      <ul>
        {sortedNumbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
};

export default SortingAlgorithmApp;