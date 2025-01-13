import React, { useState, useEffect, useRef } from "react";

interface YearSearchProps {
	onYearSelect: (year: number) => void;
	selectedYear: number;
}

const YearSearch: React.FC<YearSearchProps> = ({
	onYearSelect,
	selectedYear,
}) => {
	const [searchText, setSearchText] = useState(selectedYear.toString());
	const [suggestions, setSuggestions] = useState<number[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	// Generate years from 1940 to current year
	const allYears = Array.from(
		{ length: new Date().getFullYear() - 1940 + 1 },
		(_, i) => new Date().getFullYear() - i
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchText(value);

		if (value.trim()) {
			const filtered = allYears
				.filter((year) => year.toString().includes(value))
				.slice(0, 5);
			setSuggestions(filtered);
			setShowSuggestions(true);
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	};

	const handleYearSelect = (year: number) => {
		setSearchText(year.toString());
		onYearSelect(year);
		setShowSuggestions(false);
	};

	return (
		<div ref={wrapperRef} className="relative">
			<input
				type="text"
				value={searchText}
				onChange={handleSearchChange}
				placeholder="Search year..."
				className="bg-[var(--background)] border border-[var(--primary)] text-[var(--text)] rounded-lg px-4 py-2 w-full"
			/>
			{showSuggestions && suggestions.length > 0 && (
				<div className="absolute z-10 w-full mt-1 bg-[var(--background)] border border-[var(--primary)] rounded-lg shadow-lg">
					{suggestions.map((year) => (
						<button
							key={year}
							onClick={() => handleYearSelect(year)}
							className="w-full px-4 py-2 text-left hover:bg-[var(--primary)] hover:bg-opacity-10 transition-colors"
						>
							{year}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default YearSearch;
