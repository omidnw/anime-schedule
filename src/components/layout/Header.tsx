import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import type { Theme } from "../../contexts/ThemeContext";
import Dropdown from "../ui/Dropdown";

const themeOptions = [
	{ value: "dark", label: "Dark Theme" },
	{ value: "light", label: "Light Theme" },
	{ value: "anime", label: "Anime Theme" },
	{ value: "retro", label: "Retro Theme" },
];

const Header: React.FC = () => {
	const { currentTheme, setTheme } = useTheme();

	return (
		<header className="bg-[var(--background)] text-[var(--text)] shadow-lg sticky top-0 z-50">
			<nav className="container mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Link
						to="/"
						className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] hover:opacity-80 transition-opacity"
					>
						Omidnw World
					</Link>

					<div className="flex items-center space-x-6">
						<Link
							to="/"
							className="hover:text-[var(--primary)] transition-colors relative group"
						>
							<span>Home</span>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
						</Link>
						<Link
							to="/schedule"
							className="hover:text-[var(--primary)] transition-colors relative group"
						>
							<span>Schedule</span>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
						</Link>
						<Link
							to="/settings"
							className="hover:text-[var(--primary)] transition-colors relative group"
						>
							<span>Settings</span>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
						</Link>

						<Dropdown
							options={themeOptions}
							value={currentTheme}
							onChange={(value) => setTheme(value as Theme)}
							className="w-40"
						/>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
