// 代码生成时间: 2025-08-05 23:30:45
// theme_switcher_app.tsx
// This React component allows users to switch between different themes.
import React, { useState, useEffect } from 'react';

// Define the ThemeContext to provide theming capabilities across the application.
import { ThemeContext } from './theme_context';

// Define the themes available for switching.
const themes = {
  'light': '#fff',
  'dark': '#333',
  'colorful': '#f06',
};

// Define the ThemeSwitcher component.
const ThemeSwitcher: React.FC = () => {
  // Use the ThemeContext to access the current theme and set a new theme.
  const { theme, setTheme } = React.useContext(ThemeContext);

  // Handle the theme change.
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      // Attempt to set the new theme.
      setTheme(event.target.value);
    } catch (error) {
      // Handle any errors that occur during theme switching.
      console.error('Error switching theme:', error);
    }
  };

  return (
    <div>
      <label htmlFor='theme-selector'>
        Select a theme:{' '}
      </label>
      <select id='theme-selector' onChange={handleThemeChange} value={theme}>
        {Object.entries(themes).map(([key, value], index) => (
          <option key={index} value={key}>{key}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;

// theme_context.tsx
// This file defines the ThemeContext which holds the current theme and allows it to be changed.
import React, { createContext, useContext, useState } from 'react';

// Define the ThemeContext interface.
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
};

// Create the ThemeContext.
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

// Define the ThemeProvider component that provides the theme and a method to change it.
const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is 'light'.

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, ThemeContext };

// App.tsx
// This is the main application component that uses the ThemeContext to apply themes.
import React from 'react';
import ThemeSwitcher from './theme_switcher_app';
import { ThemeProvider } from './theme_context';
import './App.css'; // Import the CSS for styling.

// Define the main App component.
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div style={{ backgroundColor: 'var(--theme-color)' }} className='App'>
        <ThemeSwitcher />
        <h1>Theme Switcher App</h1>
        <p>This app allows you to switch between different themes.</p>
      </div>
    </ThemeProvider>
  );
};

export default App;

// App.css
/* App.css
This CSS file defines the styles for the application using CSS variables for theming. */
:root {
  --theme-color-light: #fff;
  --theme-color-dark: #333;
  --theme-color-colorful: #f06;
}

.App {
  color: var(--theme-color);
  padding: 20px;
  text-align: center;
}

/* Use CSS :root to define theme specific colors */
body {
  --theme-color: var(--theme-color-light); /* Default to light theme */
}
