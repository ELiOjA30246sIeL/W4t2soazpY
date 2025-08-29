// 代码生成时间: 2025-08-29 09:15:46
import React, { useState } from 'react';

// Interface for the text analysis result
interface AnalysisResult {
  wordCount: number;
  sentenceCount: number;
  charactersCount: number;
}

// TextFileAnalyzer component
const TextFileAnalyzer: React.FC = () => {
  // State for file upload and analysis results
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    setFile(newFile);
    setError(null);
  };

  // Handle file upload and analyze
  const handleUpload = async () => {
    if (!file) {
      setError('No file selected.');
      return;
    }
    setError(null);
    setResult(null);

    try {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (!e.target) return;
        const text = e.target.result as string;
        const analysisResult = analyzeText(text);
        setResult(analysisResult);
      };
      fileReader.readAsText(file);
    } catch (err) {
      setError('Failed to read the file.');
    }
  };

  // Analyze the text content
  const analyzeText = (text: string): AnalysisResult => {
    const words = text.match(/\b\w+\b/g) || [];
    const sentences = text.match(/[^.!?]+[.!?](?=\s|$)/g) || [];
    const characters = text.length;

    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      charactersCount: characters,
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Analyze</button>
      {error && <p>Error: {error}</p>}
      {result && (
        <div>
          <p>Word Count: {result.wordCount}</p>
          <p>Sentence Count: {result.sentenceCount}</p>
          <p>Character Count: {result.charactersCount}</p>
        </div>
      )}
    </div>
  );
};

export default TextFileAnalyzer;
