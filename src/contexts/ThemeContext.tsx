import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "dark" | "light" | "anime" | "retro";

interface ThemeContextType {
	currentTheme: Theme;
	setTheme: (theme: Theme) => void;
}

const themes = {
	dark: {
		background: "#121212",
		text: "#FFFFFF",
		primary: "#BB86FC",
		secondary: "#03DAC6",
	},
	light: {
		background: "#FFFFFF",
		text: "#333333",
		primary: "#6200EE",
		secondary: "#03DAC6",
	},
	anime: {
		background: "#FF4081",
		text: "#FFFFFF",
		primary: "#3F51B5",
		secondary: "#FFC107",
	},
	retro: {
		background: "#F5F5DC",
		text: "#333333",
		primary: "#FF4500",
		secondary: "#32CD32",
	},
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentTheme, setCurrentTheme] = useState<Theme>(
		() => (localStorage.getItem("theme") as Theme) || "dark"
	);

	useEffect(() => {
		localStorage.setItem("theme", currentTheme);
		const colors = themes[currentTheme];
		Object.entries(colors).forEach(([key, value]) => {
			document.documentElement.style.setProperty(`--${key}`, value);
		});
	}, [currentTheme]);

	const setTheme = (theme: Theme) => {
		setCurrentTheme(theme);
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
