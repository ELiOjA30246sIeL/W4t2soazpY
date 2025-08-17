// 代码生成时间: 2025-08-17 20:41:46
 * A React component that calculates hash values for input strings.
 * @author Your Name
 * @version 1.0.0
 * @since 2023-09-01
 */

import React, { useState } from 'react';
import { createHash } from 'crypto';

interface HashCalculatorProps {
  // No additional props needed
}

const HashCalculatorApp: React.FC<HashCalculatorProps> = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Calculate hash for a given input using SHA256 algorithm.
   * @param {string} input The string to calculate the hash for.
   */
  const calculateHash = () => {
    try {
      const hashCreator = createHash('sha256');
      hashCreator.update(input);
      const result = hashCreator.digest('hex');
      setHash(result);
      setError(null);
    } catch (e) {
      setError('Failed to calculate hash: ' + e.message);
      setHash('');
    }
  };

  return (
    <div className="hash-calculator">
      <h1>Hash Calculator Tool</h1>
      <input
        type="text"
        placeholder="Enter text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input"
      />
a      <button onClick={calculateHash} className="calculate-button">Calculate Hash</button>

      {error && <p className="error">{error}</p>}
      {hash && <p className="result">Hash: {hash}</p>}
    </div>
  );
};

export default HashCalculatorApp;