declare module "google-translate-api-browser" {
	interface TranslateOptions {
		from?: string;
		to: string;
		raw?: boolean;
	}

	interface TranslateResult {
		text: string;
		from: {
			language: {
				iso: string;
			};
			text: {
				autoCorrected: boolean;
				value: string;
				didYouMean: boolean;
			};
		};
		raw: string;
	}

	export function translate(
		text: string,
		options: TranslateOptions
	): Promise<TranslateResult>;
}
