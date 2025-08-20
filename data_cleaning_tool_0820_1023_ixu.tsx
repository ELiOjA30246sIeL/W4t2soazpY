// 代码生成时间: 2025-08-20 10:23:28
import React, { useState } from 'react';

// Interface for the data model that will be cleaned
interface DataModel {
  name: string;
  age: string;
  email: string;
}

// Interface for the cleaned data model
interface CleanedDataModel {
  name: string;
  age: number;
  email: string;
}

// Function to clean and preprocess the data
function cleanData(data: DataModel): CleanedDataModel | null {
  try {
    // Validate and clean the name field
    if (!data.name) throw new Error('Name is required.');
    const name = data.name.trim();

    // Validate and clean the age field
    if (!data.age) throw new Error('Age is required.');
    const age = parseInt(data.age, 10);
    if (isNaN(age)) throw new Error('Invalid age format.');

    // Validate and clean the email field
    if (!data.email) throw new Error('Email is required.');
    const email = data.email.trim().toLowerCase();

    return { name, age, email };
  } catch (error) {
    console.error('Error cleaning data:', error);
    return null;
  }
}

// React component to handle data input and display
const DataCleaningTool: React.FC = () => {
  // State to hold the input data and cleaned data
  const [inputData, setInputData] = useState<DataModel>({ name: '', age: '', email: '' });
  const [cleanedData, setCleanedData] = useState<CleanedDataModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleaned = cleanData(inputData);
    if (cleaned) setCleanedData(cleaned);
    else setError('Data cleaning failed.');
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={inputData.age}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Clean Data</button>
      </form>
      {cleanedData && (
        <div>
          <p>Name: {cleanedData.name}</p>
          <p>Age: {cleanedData.age}</p>
          <p>Email: {cleanedData.email}</p>
        </div>
      )}
    </div>
  );
};

export default DataCleaningTool;