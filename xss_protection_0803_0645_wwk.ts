// 代码生成时间: 2025-08-03 06:45:57
// XSS Protection Component
// This component demonstrates how to prevent XSS attacks using React and TypeScript.
import React, { useEffect, useState } from 'react';

// A simple function to escape HTML special characters and prevent XSS
function escapeHTML(str: string): string {
    return str.replace("&", "&amp;").replace(/"/g, "&quot;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

// The component that takes user input and displays it safely
const SafeDisplay: React.FC<{ userInput: string }> = ({ userInput }) => {
    const [safeContent, setSafeContent] = useState<string>(userInput);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Escape user input to prevent XSS
        try {
            const cleanInput = escapeHTML(userInput);
            setSafeContent(cleanInput);
        } catch (e) {
            setError('Error sanitizing input');
        }
    }, [userInput]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    return <div>{safeContent}</div>;
};

// Exporting the SafeDisplay component for use in other parts of the application
export default SafeDisplay;