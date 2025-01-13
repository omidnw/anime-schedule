import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface DropdownOption {
	value: string;
	label: string;
}

interface DropdownProps {
	options: DropdownOption[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	value,
	onChange,
	placeholder = "Select an option",
	className = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const selectedOption = options.find((option) => option.value === value);

	return (
		<div ref={dropdownRef} className={`relative ${className}`}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={`w-full bg-[#1a1a1a] text-[var(--text)] rounded-lg px-4 py-2 flex items-center justify-between transition-all duration-200 border border-[#2a2a2a] ${
					isOpen
						? "ring-2 ring-[var(--primary)]"
						: "hover:border-[var(--primary)]"
				}`}
			>
				<span className="font-medium text-[var(--text)]">
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<ChevronDownIcon
					className={`w-5 h-5 text-[var(--primary)] transition-transform duration-200 ${
						isOpen ? "transform rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl overflow-hidden">
					<div className="max-h-60 overflow-y-auto py-1">
						{options.map((option) => (
							<button
								key={option.value}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								className={`w-full px-4 py-2 text-left transition-all duration-200 ${
									option.value === value
										? "bg-[var(--primary)] text-white font-medium"
										: "text-[var(--text)] hover:bg-[var(--primary)] hover:bg-opacity-10"
								}`}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
