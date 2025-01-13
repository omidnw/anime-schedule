import React from "react";

const Footer: React.FC = () => {
	return (
		<footer className="bg-[var(--background)] text-[var(--text)] py-8">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<h3 className="text-xl font-bold text-[var(--primary)]">
							Omidnw World
						</h3>
						<p className="mt-2">Your favorite anime destination</p>
					</div>

					<div className="flex space-x-6">
						<a
							href="#"
							className="hover:text-[var(--primary)] transition-colors"
						>
							About Us
						</a>
						<a
							href="#"
							className="hover:text-[var(--primary)] transition-colors"
						>
							Contact
						</a>
						<a
							href="#"
							className="hover:text-[var(--primary)] transition-colors"
						>
							Privacy Policy
						</a>
					</div>
				</div>

				<div className="mt-8 text-center text-sm">
					<p>
						&copy; {new Date().getFullYear()} Omidnw World. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
