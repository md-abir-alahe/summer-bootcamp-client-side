import React, { createContext, useEffect, useState } from 'react';

// ThemeProvider configuration
export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {

    const [dark, setDark] = useState(true);
    const userThemeMode = localStorage.getItem("isDark");
    if(!userThemeMode){
        localStorage.setItem("isDark", "true");
    }
        useEffect(() => {
            if (userThemeMode === "true") {
                setDark(true);
            } else {
                setDark(false);
            }
        }, []);

    const handleThemeToggle = () => {
        if (dark) {
            localStorage.setItem("isDark", "false");
        } else {
            localStorage.setItem("isDark", "true");
        }
        setDark(!dark);

    }

    const themeInfo = {
        dark,
        handleThemeToggle
    }
    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;