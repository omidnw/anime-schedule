import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { jikanApi, AnimeItem } from "../services/jikanApi";
import { ArrowLeftIcon, LanguageIcon } from "@heroicons/react/24/solid";
import {
	languages,
	getUserPreferredLanguage,
	translateText,
	Language,
} from "../services/translateService";

const createMarkup = (html: string) => {
	return { __html: html };
};

const AnimeDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [anime, setAnime] = useState<AnimeItem | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Translation states
	const [translatedSynopsis, setTranslatedSynopsis] = useState<string>("");
	const [isTranslating, setIsTranslating] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState<Language>(
		getUserPreferredLanguage()
	);
	const [showOriginal, setShowOriginal] = useState(true);

	useEffect(() => {
		const fetchAnimeDetails = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await jikanApi.getAnimeDetails(Number(id));
				setAnime(response.data);
			} catch (err) {
				setError("Failed to load anime details. Please try again later.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchAnimeDetails();
		}
	}, [id]);

	const handleTranslate = async () => {
		if (!anime?.synopsis || isTranslating) return;

		setIsTranslating(true);
		setError(null);

		try {
			const translated = await translateText(
				anime.synopsis,
				selectedLanguage.code
			);
			setTranslatedSynopsis(translated);
			setShowOriginal(false);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to translate synopsis. Please try again later.";
			setError(`Translation Error: ${errorMessage}`);
			setShowOriginal(true);
		} finally {
			setIsTranslating(false);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-6 py-12">
				<div className="text-center py-8">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] mx-auto"></div>
				</div>
			</div>
		);
	}

	if (error || !anime) {
		return (
			<div className="container mx-auto px-6 py-12">
				<div className="text-red-500 text-center py-4">
					{error || "Anime not found"}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-6 py-12">
			<Link
				to="/schedule"
				className="inline-flex items-center text-[var(--primary)] hover:text-[var(--secondary)] mb-8 transition-colors"
			>
				<ArrowLeftIcon className="w-5 h-5 mr-2" />
				Back to Schedule
			</Link>

			<div className="bg-[var(--background)] border border-[var(--primary)] rounded-lg shadow-lg overflow-hidden">
				<div className="md:flex">
					{/* Left Column - Image */}
					<div className="md:w-1/3">
						<img
							src={anime.images.jpg.image_url}
							alt={anime.title}
							className="w-full h-[500px] object-cover"
						/>
					</div>

					{/* Right Column - Details */}
					<div className="md:w-2/3 p-6 md:p-8">
						<h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
						{anime.title_english && anime.title_english !== anime.title && (
							<h2 className="text-xl text-[var(--primary)] mb-4">
								{anime.title_english}
							</h2>
						)}

						<div className="flex flex-wrap gap-3 mb-6">
							{anime.type && (
								<span className="px-3 py-1 bg-[var(--secondary)] text-white rounded-full text-sm">
									{anime.type}
								</span>
							)}
							{anime.status && (
								<span className="px-3 py-1 bg-[var(--primary)] bg-opacity-50 rounded-full text-sm">
									{anime.status}
								</span>
							)}
							{anime.episodes && (
								<span className="px-3 py-1 bg-[var(--primary)] bg-opacity-50 rounded-full text-sm">
									{anime.episodes} Episodes
								</span>
							)}
						</div>

						{anime.broadcast?.time && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-2">Broadcast Time</h3>
								<p className="text-[var(--primary)]">
									{anime.broadcast.day} at {anime.broadcast.time} (JST)
								</p>
							</div>
						)}

						<div className="mb-6">
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-lg font-semibold">Synopsis</h3>
								<div className="flex items-center gap-2">
									<select
										value={selectedLanguage.code}
										onChange={(e) => {
											const lang = languages.find(
												(l) => l.code === e.target.value
											);
											if (lang) setSelectedLanguage(lang);
										}}
										className="bg-[var(--background)] border border-[var(--primary)] text-[var(--text)] rounded px-2 py-1 text-sm"
									>
										{languages.map((lang) => (
											<option key={lang.code} value={lang.code}>
												{lang.name}
											</option>
										))}
									</select>
									<button
										onClick={handleTranslate}
										disabled={isTranslating}
										className="inline-flex items-center px-3 py-1 bg-[var(--primary)] text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50"
									>
										<LanguageIcon className="w-4 h-4 mr-1" />
										{isTranslating ? "Translating..." : "Translate"}
									</button>
									{translatedSynopsis && (
										<button
											onClick={() => setShowOriginal(!showOriginal)}
											className="text-sm text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
										>
											{showOriginal ? "Show Translation" : "Show Original"}
										</button>
									)}
								</div>
							</div>
							{showOriginal ? (
								<p className="text-[var(--text)] opacity-90 leading-relaxed">
									{anime.synopsis}
								</p>
							) : (
								<div
									className="text-[var(--text)] opacity-90 leading-relaxed"
									dangerouslySetInnerHTML={createMarkup(
										translatedSynopsis || anime.synopsis
									)}
								/>
							)}
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold mb-2">Season</h3>
								<p className="capitalize">
									{anime.season} {anime.year}
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Aired</h3>
								<p>
									{new Date(anime.aired.from).toLocaleDateString()} -{" "}
									{anime.aired.to
										? new Date(anime.aired.to).toLocaleDateString()
										: "Ongoing"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimeDetails;
