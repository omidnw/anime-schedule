import axios from "axios";

export interface Language {
	code: string;
	name: string;
	direction: "ltr" | "rtl";
}

interface MyMemoryResponse {
	responseData: {
		translatedText: string;
		match: number;
	};
	responseStatus: number;
	responseDetails: string;
}

// Common languages with their codes (RFC3066 compliant)
// Added direction property for each language
export const languages: Language[] = [
	{ code: "en", name: "English", direction: "ltr" },
	{ code: "es", name: "Spanish", direction: "ltr" },
	{ code: "fr", name: "French", direction: "ltr" },
	{ code: "de", name: "German", direction: "ltr" },
	{ code: "it", name: "Italian", direction: "ltr" },
	{ code: "pt", name: "Portuguese", direction: "ltr" },
	{ code: "ru", name: "Russian", direction: "ltr" },
	{ code: "zh-CN", name: "Chinese (Simplified)", direction: "ltr" },
	{ code: "ko", name: "Korean", direction: "ltr" },
	{ code: "ja", name: "Japanese", direction: "ltr" },
	{ code: "fa", name: "Persian", direction: "rtl" },
	{ code: "ar", name: "Arabic", direction: "rtl" },
	{ code: "he", name: "Hebrew", direction: "rtl" },
	{ code: "ur", name: "Urdu", direction: "rtl" },
];

// Helper function to wrap text with appropriate direction tags
const wrapWithDirectionTags = (text: string, lang: Language): string => {
	const dirAttribute = lang.direction === "rtl" ? "rtl" : "ltr";
	return `<div dir="${dirAttribute}" lang="${lang.code}">${text}</div>`;
};

export const getUserPreferredLanguage = (): Language => {
	// Get browser language (e.g., 'en-US', 'es-ES')
	const browserLang = navigator.language;

	// Try to find exact match first (for languages like zh-CN)
	const exactMatch = languages.find((lang) =>
		browserLang.toLowerCase().startsWith(lang.code.toLowerCase())
	);
	if (exactMatch) return exactMatch;

	// If no exact match, try base language match
	const baseLanguage = browserLang.split("-")[0];
	return (
		languages.find((lang) => lang.code.split("-")[0] === baseLanguage) ||
		languages[0]
	);
};

export const translateText = async (
	text: string,
	targetLang: string
): Promise<string> => {
	try {
		// Split long text into chunks of 500 characters to avoid length limitations
		const chunks = text.match(/.{1,500}(?:\s|$)/g) || [];
		const translatedChunks = await Promise.all(
			chunks.map(async (chunk) => {
				// Using MyMemory Translation API with English as source language
				const response = await axios.get<MyMemoryResponse>(
					`https://api.mymemory.translated.net/get`,
					{
						params: {
							q: chunk,
							langpair: `en|${targetLang}`, // Using English as source since anime synopses are in English
							de: "support@animeguffy.com",
						},
					}
				);

				if (response.data?.responseData?.translatedText) {
					return response.data.responseData.translatedText;
				}
				throw new Error(response.data?.responseDetails || "Translation failed");
			})
		);

		const translatedText = translatedChunks.join(" ");
		// Find the target language object to get its direction
		const targetLanguage =
			languages.find((lang) => lang.code === targetLang) || languages[0];

		// Wrap the translated text with appropriate direction tags
		return wrapWithDirectionTags(translatedText, targetLanguage);
	} catch (error) {
		console.error("Translation error:", error);
		// Check if the error has a response property with status
		const err = error as { response?: { status: number }; message?: string };
		if (err.response?.status === 429) {
			throw new Error("Translation limit reached. Please try again later.");
		}
		throw new Error(
			err.message || "Failed to translate text. Please try again."
		);
	}
};
