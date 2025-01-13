import React, { useState, useEffect } from "react";
import { jikanApi, AnimeItem, Season } from "../services/jikanApi";
import YearSearch from "../components/YearSearch";
import {
	Squares2X2Icon as ViewGridIcon,
	ListBulletIcon as ViewListIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

type ViewMode = "weekly" | "seasonal" | "search";
type DisplayMode = "card" | "table";
type WeekDay =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

interface Preferences {
	viewMode: ViewMode;
	displayMode: DisplayMode;
	selectedYear: number;
	selectedSeason: Season;
	selectedDay: WeekDay;
}

// Load preferences from localStorage
const loadPreferences = (): Preferences => {
	const saved = localStorage.getItem("animeSchedulePreferences");
	if (saved) {
		return JSON.parse(saved);
	}
	return {
		viewMode: "weekly",
		displayMode: "card",
		selectedYear: new Date().getFullYear(),
		selectedSeason: "winter",
		selectedDay: "monday",
	};
};

const Schedule: React.FC = () => {
	const [preferences, setPreferences] = useState<Preferences>(
		loadPreferences()
	);
	const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const seasons: Season[] = ["winter", "spring", "summer", "fall"];
	const weekDays: WeekDay[] = [
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	];

	// Save preferences to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem(
			"animeSchedulePreferences",
			JSON.stringify(preferences)
		);
	}, [preferences]);

	useEffect(() => {
		loadAnimeData();
	}, [
		preferences.viewMode,
		preferences.selectedDay,
		preferences.selectedYear,
		preferences.selectedSeason,
	]);

	const updatePreference = <K extends keyof Preferences>(
		key: K,
		value: Preferences[K]
	) => {
		setPreferences((prev) => ({ ...prev, [key]: value }));
	};

	const loadAnimeData = async () => {
		setLoading(true);
		setError(null);
		try {
			let response;
			switch (preferences.viewMode) {
				case "weekly":
					response = await jikanApi.getSchedule(preferences.selectedDay);
					break;
				case "seasonal":
					response = await jikanApi.getSeason(
						preferences.selectedYear,
						preferences.selectedSeason
					);
					break;
				case "search":
					if (searchQuery.trim()) {
						response = await jikanApi.searchAnime(searchQuery);
					} else {
						response = await jikanApi.getCurrentSeason();
					}
					break;
			}
			setAnimeList(response?.data || []);
		} catch (err) {
			setError("Failed to load anime data. Please try again later.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			updatePreference("viewMode", "search");
			await loadAnimeData();
		}
	};

	const renderAnimeCard = (anime: AnimeItem) => (
		<Link
			to={`/anime/${anime.mal_id}`}
			className="block bg-[var(--background)] border border-[var(--primary)] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
		>
			<div className="relative group">
				<img
					src={anime.images.jpg.image_url}
					alt={anime.title}
					className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
					<div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
						{anime.broadcast?.time && (
							<span className="bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm">
								{anime.broadcast.day} at {anime.broadcast.time} (JST)
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="p-4">
				<h3 className="text-lg font-bold mb-1 line-clamp-1">{anime.title}</h3>
				{anime.title_english && anime.title_english !== anime.title && (
					<h4 className="text-sm text-[var(--primary)] mb-2 line-clamp-1">
						{anime.title_english}
					</h4>
				)}
				<div className="mb-3 flex flex-wrap gap-2">
					{anime.type && (
						<span className="px-2 py-1 bg-[var(--secondary)] text-white rounded-full text-xs">
							{anime.type}
						</span>
					)}
					{anime.status && (
						<span className="px-2 py-1 bg-[var(--primary)] bg-opacity-50 rounded-full text-xs">
							{anime.status}
						</span>
					)}
				</div>
				<p className="text-sm opacity-75 mb-3 line-clamp-2">{anime.synopsis}</p>
				{anime.episodes && (
					<div className="text-sm font-semibold text-[var(--primary)]">
						{anime.episodes} Episodes
					</div>
				)}
			</div>
		</Link>
	);

	const renderAnimeTable = (anime: AnimeItem) => (
		<tr
			key={anime.mal_id}
			className="border-b border-[var(--primary)] border-opacity-20 hover:bg-[var(--primary)] hover:bg-opacity-5 transition-colors cursor-pointer"
			onClick={() => (window.location.href = `/anime/${anime.mal_id}`)}
		>
			<td className="py-4 px-6">
				<div className="flex items-center space-x-4">
					<img
						src={anime.images.jpg.image_url}
						alt={anime.title}
						className="w-16 h-24 object-cover rounded"
					/>
					<div>
						<h3 className="font-bold">{anime.title}</h3>
						{anime.title_english && anime.title_english !== anime.title && (
							<p className="text-sm text-[var(--primary)]">
								{anime.title_english}
							</p>
						)}
					</div>
				</div>
			</td>
			<td className="py-4 px-6">{anime.type}</td>
			<td className="py-4 px-6">{anime.status}</td>
			<td className="py-4 px-6">{anime.episodes || "N/A"}</td>
			<td className="py-4 px-6">
				{anime.broadcast?.time
					? `${anime.broadcast.day} at ${anime.broadcast.time} (JST)`
					: "N/A"}
			</td>
		</tr>
	);

	return (
		<div className="container mx-auto px-6 py-12">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-4xl font-bold text-[var(--primary)]">
					Anime Schedule
				</h1>
				<div className="flex items-center space-x-4">
					<button
						onClick={() => updatePreference("displayMode", "card")}
						className={`p-2 rounded-lg transition-colors ${
							preferences.displayMode === "card"
								? "bg-[var(--primary)] text-white"
								: "bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)]"
						}`}
					>
						<ViewGridIcon className="w-6 h-6" />
					</button>
					<button
						onClick={() => updatePreference("displayMode", "table")}
						className={`p-2 rounded-lg transition-colors ${
							preferences.displayMode === "table"
								? "bg-[var(--primary)] text-white"
								: "bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)]"
						}`}
					>
						<ViewListIcon className="w-6 h-6" />
					</button>
				</div>
			</div>

			{/* View Mode Selection */}
			<div className="flex justify-center mb-8 space-x-4">
				<button
					onClick={() => updatePreference("viewMode", "weekly")}
					className={`px-4 py-2 rounded-lg transition-colors ${
						preferences.viewMode === "weekly"
							? "bg-[var(--primary)] text-white"
							: "bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)]"
					}`}
				>
					Weekly Schedule
				</button>
				<button
					onClick={() => updatePreference("viewMode", "seasonal")}
					className={`px-4 py-2 rounded-lg transition-colors ${
						preferences.viewMode === "seasonal"
							? "bg-[var(--primary)] text-white"
							: "bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)]"
					}`}
				>
					Seasonal Anime
				</button>
				<button
					onClick={() => updatePreference("viewMode", "search")}
					className={`px-4 py-2 rounded-lg transition-colors ${
						preferences.viewMode === "search"
							? "bg-[var(--primary)] text-white"
							: "bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)]"
					}`}
				>
					Search Anime
				</button>
			</div>

			{/* Filters */}
			<div className="mb-8">
				{preferences.viewMode === "weekly" && (
					<div className="flex justify-center space-x-4">
						{weekDays.map((day) => (
							<button
								key={day}
								onClick={() => updatePreference("selectedDay", day)}
								className={`px-4 py-2 rounded-lg capitalize transition-colors ${
									preferences.selectedDay === day
										? "bg-[var(--primary)] text-white"
										: "bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)]"
								}`}
							>
								{day}
							</button>
						))}
					</div>
				)}

				{preferences.viewMode === "seasonal" && (
					<div className="flex justify-center space-x-4">
						<YearSearch
							selectedYear={preferences.selectedYear}
							onYearSelect={(year) => updatePreference("selectedYear", year)}
						/>
						<select
							value={preferences.selectedSeason}
							onChange={(e) =>
								updatePreference("selectedSeason", e.target.value as Season)
							}
							className="bg-[var(--background)] border border-[var(--primary)] text-[var(--text)] rounded-lg px-4 py-2"
						>
							{seasons.map((season) => (
								<option key={season} value={season}>
									{season.charAt(0).toUpperCase() + season.slice(1)}
								</option>
							))}
						</select>
					</div>
				)}

				{preferences.viewMode === "search" && (
					<form
						onSubmit={handleSearch}
						className="flex justify-center space-x-4"
					>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search anime..."
							className="bg-[var(--background)] border border-[var(--primary)] text-[var(--text)] rounded-lg px-4 py-2 w-full max-w-md"
						/>
						<button
							type="submit"
							className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
						>
							Search
						</button>
					</form>
				)}
			</div>

			{/* Loading and Error States */}
			{loading && (
				<div className="text-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] mx-auto"></div>
				</div>
			)}

			{error && <div className="text-red-500 text-center py-4">{error}</div>}

			{/* Anime List */}
			{!loading &&
				!error &&
				(preferences.displayMode === "card" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{animeList.map(renderAnimeCard)}
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-[var(--primary)] bg-opacity-10">
								<tr>
									<th className="py-4 px-6 text-left">Title</th>
									<th className="py-4 px-6 text-left">Type</th>
									<th className="py-4 px-6 text-left">Status</th>
									<th className="py-4 px-6 text-left">Episodes</th>
									<th className="py-4 px-6 text-left">Broadcast</th>
								</tr>
							</thead>
							<tbody>{animeList.map(renderAnimeTable)}</tbody>
						</table>
					</div>
				))}
		</div>
	);
};

export default Schedule;
