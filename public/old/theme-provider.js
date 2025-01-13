// Theme Provider Script
const ThemeProvider = {
	themes: {
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
	},

	// Get the current theme from local storage
	getCurrentTheme() {
		return localStorage.getItem("theme") || "dark";
	},

	// Save the selected theme to local storage
	saveTheme(theme) {
		localStorage.setItem("theme", theme);
		this.applyTheme(theme);
	},

	// Apply the selected theme to the page
	applyTheme(theme) {
		const colors = this.themes[theme];
		document.documentElement.style.setProperty(
			"--background",
			colors.background
		);
		document.documentElement.style.setProperty("--text", colors.text);
		document.documentElement.style.setProperty("--primary", colors.primary);
		document.documentElement.style.setProperty("--secondary", colors.secondary);
	},

	// Initialize the theme on page load
	init() {
		const currentTheme = this.getCurrentTheme();
		this.applyTheme(currentTheme);
	},
};

// Initialize the theme provider
ThemeProvider.init();
