import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<footer className="bg-[var(--background)] text-[var(--text)] py-8 border-t border-[var(--primary)] border-opacity-20">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<h3 className="text-xl font-bold text-[var(--primary)]">
							Omidnw World
						</h3>
						<p className="mt-2 text-sm opacity-80">
							Your favorite anime schedule companion
						</p>
					</div>

					<div className="flex flex-wrap gap-6">
						<Link
							to="/about"
							className="hover:text-[var(--primary)] transition-colors"
						>
							About
						</Link>
						<Link
							to="/schedule"
							className="hover:text-[var(--primary)] transition-colors"
						>
							Schedule
						</Link>
						<Link
							to="/settings"
							className="hover:text-[var(--primary)] transition-colors"
						>
							Settings
						</Link>
					</div>
				</div>

				<div className="mt-8 text-center text-sm opacity-80">
					<p>
						&copy; {new Date().getFullYear()} Omidnw World. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
