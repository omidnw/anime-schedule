import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "dark" | "light" | "anime" | "retro";

interface ThemeContextType {
	currentTheme: Theme;
	setTheme: (theme: Theme) => void;
}

// Use a namespace to avoid conflicts
const STORAGE_KEY = "omidnw_theme_v1";

const themes = {
	dark: {
		background: "#121212", // Dark Gray
		text: "#FFFFFF", // White
		primary: "#BB86FC", // Purple
		secondary: "#03DAC6", // Teal
	},
	light: {
		background: "#FFFFFF", // White
		text: "#333333", // Dark Gray for better contrast
		primary: "#6200EE", // Indigo
		secondary: "#03DAC6", // Teal
	},
	anime: {
		background: "#FF4081", // Pink
		text: "#FFFFFF", // White
		primary: "#3F51B5", // Indigo
		secondary: "#FFC107", // Amber
	},
	retro: {
		background: "#F5F5DC", // Beige
		text: "#333333", // Dark Gray for better contrast
		primary: "#FF4500", // Orange Red
		secondary: "#32CD32", // Lime Green
	},
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getCurrentTheme = (): Theme => {
	if (typeof window === "undefined") return "dark";
	const savedTheme = localStorage.getItem(STORAGE_KEY);
	return (
		savedTheme && Object.keys(themes).includes(savedTheme) ? savedTheme : "dark"
	) as Theme;
};

const applyTheme = (theme: Theme) => {
	const colors = themes[theme];
	if (!colors || typeof window === "undefined") return;

	Object.entries(colors).forEach(([key, value]) => {
		document.documentElement.style.setProperty(`--${key}`, value);
	});
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentTheme, setCurrentTheme] = useState<Theme>(getCurrentTheme);

	useEffect(() => {
		// Initialize theme on mount
		applyTheme(currentTheme);
	}, []); // Only run once on mount

	useEffect(() => {
		// Update theme when it changes
		localStorage.setItem(STORAGE_KEY, currentTheme);
		applyTheme(currentTheme);
	}, [currentTheme]);

	const setTheme = (theme: Theme) => {
		if (Object.keys(themes).includes(theme)) {
			setCurrentTheme(theme);
		}
	};

	return (
		<ThemeContext.Provider value={{ currentTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
