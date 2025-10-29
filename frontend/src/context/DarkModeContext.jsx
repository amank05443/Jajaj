import { createContext, useContext, useState} from "react";
const DarkModeContext = createContext();

export function DarkModeProvider({ childern}) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
        };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleTheme}}>
            {childern}
            </DarkModeContext.Provider>
            );
        }

    export function useDarkMode() {
        return useContext(DarkModeContext);
        }