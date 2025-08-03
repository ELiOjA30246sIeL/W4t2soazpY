// 代码生成时间: 2025-08-03 18:39:28
import React, { useState } from 'react';

// Interface for the form data
interface FormData {
  name: string;
  email: string;
  age: string;
}

// Interface for the form validation errors
interface ValidationErrors {
  [key: string]: string;
}

// Function to validate the form data
function validateFormData(data: FormData): ValidationErrors | null {
  const errors: ValidationErrors = {};
  
  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required.';
  }
  
  // Email validation
  if (!data.email) {
    errors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid.';
  }
  
  // Age validation
  if (!data.age) {
    errors.age = 'Age is required.';
  } else if (isNaN(Number(data.age)) || Number(data.age) < 0) {
    errors.age = 'Age must be a positive number.';
  }
  
  // Return null if there are no errors, otherwise return the errors object
  return Object.keys(errors).length === 0 ? null : errors;
}

// FormValidator component
const FormValidator: React.FC = () => {
  // State to store the form data
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', age: '' });
  
  // State to store the validation errors
  const [errors, setErrors] = useState<ValidationErrors | null>(null);
  
  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      // Handle successful form submission
      console.log('Form data:', formData);
      // Reset form and errors
      setFormData({ name: '', email: '', age: '' });
      setErrors(null);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors?.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors?.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors?.age && <p>{errors.age}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormValidator;