import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import type { Theme } from "../contexts/ThemeContext";
import Dropdown from "../components/ui/Dropdown";
import {
	Cog6ToothIcon,
	PaintBrushIcon,
	BellIcon,
} from "@heroicons/react/24/solid";

const themeOptions = [
	{ value: "dark", label: "Dark Theme" },
	{ value: "light", label: "Light Theme" },
	{ value: "anime", label: "Anime Theme" },
	{ value: "retro", label: "Retro Theme" },
];

const Settings: React.FC = () => {
	const { currentTheme, setTheme } = useTheme();

	return (
		<div className="container mx-auto px-6 py-12">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center gap-3 mb-12">
					<Cog6ToothIcon className="w-8 h-8 text-[var(--primary)]" />
					<h1 className="text-4xl font-bold text-[var(--primary)]">Settings</h1>
				</div>

				{/* Theme Selection */}
				<section className="bg-[var(--background)] border border-[var(--primary)] rounded-2xl p-8 mb-8 shadow-lg">
					<div className="flex items-center gap-3 mb-6">
						<PaintBrushIcon className="w-6 h-6 text-[var(--secondary)]" />
						<h2 className="text-2xl font-bold text-[var(--secondary)]">
							Theme Settings
						</h2>
					</div>

					<div className="space-y-6">
						<div>
							<label className="block text-sm font-medium mb-2">
								Select Theme
							</label>
							<Dropdown
								options={themeOptions}
								value={currentTheme}
								onChange={(value) => setTheme(value as Theme)}
								className="max-w-xs"
							/>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{themeOptions.map((theme) => (
								<button
									key={theme.value}
									onClick={() => setTheme(theme.value as Theme)}
									className={`p-6 rounded-xl border-2 transition-all duration-300 ${
										currentTheme === theme.value
											? "border-[var(--primary)] bg-[var(--primary)] bg-opacity-10 shadow-lg scale-105"
											: "border-[var(--text)] border-opacity-20 hover:border-[var(--primary)] hover:scale-105"
									}`}
								>
									<div className="text-center">
										<div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-75" />
										<span className="block font-semibold">{theme.label}</span>
									</div>
								</button>
							))}
						</div>
					</div>
				</section>

				{/* Notifications */}
				<section className="bg-[var(--background)] border border-[var(--primary)] rounded-2xl p-8 shadow-lg">
					<div className="flex items-center gap-3 mb-6">
						<BellIcon className="w-6 h-6 text-[var(--secondary)]" />
						<h2 className="text-2xl font-bold text-[var(--secondary)]">
							Notification Preferences
						</h2>
					</div>

					<div className="space-y-6">
						<div className="flex items-center justify-between p-4 rounded-lg border border-[var(--text)] border-opacity-20 hover:border-[var(--primary)] transition-colors">
							<div>
								<h3 className="font-semibold">Email Notifications</h3>
								<p className="text-sm opacity-75">
									Receive updates about new anime releases
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" className="sr-only peer" />
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
							</label>
						</div>

						<div className="flex items-center justify-between p-4 rounded-lg border border-[var(--text)] border-opacity-20 hover:border-[var(--primary)] transition-colors">
							<div>
								<h3 className="font-semibold">Browser Notifications</h3>
								<p className="text-sm opacity-75">
									Get notified when your favorite shows are airing
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" className="sr-only peer" />
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
							</label>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Settings;
