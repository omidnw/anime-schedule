import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

export interface AnimeItem {
	mal_id: number;
	title: string;
	title_english: string | null;
	images: {
		jpg: {
			image_url: string;
		};
	};
	type: string;
	episodes: number | null;
	status: string;
	aired: {
		from: string;
		to: string | null;
	};
	broadcast: {
		day: string;
		time: string;
	};
	season: string;
	year: number;
	synopsis: string;
}

export interface JikanResponse<T> {
	data: T;
	pagination?: {
		last_visible_page: number;
		has_next_page: boolean;
	};
}

export type Season = "winter" | "spring" | "summer" | "fall";

class JikanAPI {
	private async request<T>(endpoint: string) {
		try {
			// Add delay to respect rate limiting
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const response = await axios.get<T>(`${BASE_URL}${endpoint}`);
			return response.data;
		} catch (error) {
			console.error("JikanAPI Error:", error);
			throw error;
		}
	}

	async getCurrentSeason() {
		return this.request<JikanResponse<AnimeItem[]>>("/seasons/now");
	}

	async getSeason(year: number, season: Season) {
		return this.request<JikanResponse<AnimeItem[]>>(
			`/seasons/${year}/${season}`
		);
	}

	async searchAnime(query: string) {
		return this.request<JikanResponse<AnimeItem[]>>(
			`/anime?q=${encodeURIComponent(query)}&sfw=true`
		);
	}

	async getSchedule(weekday?: string) {
		const endpoint = weekday
			? `/schedules?filter=${weekday.toLowerCase()}`
			: "/schedules";
		return this.request<JikanResponse<AnimeItem[]>>(endpoint);
	}

	async getUpcoming() {
		return this.request<JikanResponse<AnimeItem[]>>("/seasons/upcoming");
	}

	async getAnimeDetails(id: number) {
		return this.request<JikanResponse<AnimeItem>>(`/anime/${id}`);
	}
}

export const jikanApi = new JikanAPI();
