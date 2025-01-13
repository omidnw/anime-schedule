import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import anime from "animejs";
import { CalendarIcon } from "@heroicons/react/24/solid";

const Home: React.FC = () => {
	useEffect(() => {
		// Hero Section Animation
		anime({
			targets: "#anime-target",
			opacity: [0, 0.3],
			duration: 2000,
			easing: "easeInOutQuad",
			loop: true,
			direction: "alternate",
		});

		// Feature Cards Animation
		anime({
			targets: ".feature-card",
			translateY: [20, 0],
			opacity: [0, 1],
			delay: anime.stagger(200),
			duration: 1000,
			easing: "easeOutExpo",
		});

		// Floating elements animation
		anime({
			targets: ".floating-element",
			translateY: ["-10px", "10px"],
			duration: 2000,
			direction: "alternate",
			loop: true,
			easing: "easeInOutSine",
			delay: anime.stagger(200),
		});
	}, []);

	return (
		<div>
			{/* Hero Section */}
			<section className="hero min-h-[80vh] relative overflow-hidden flex items-center">
				<div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
				<div
					id="anime-target"
					className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] opacity-0"
				/>

				{/* Floating Elements */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(10)].map((_, i) => (
						<div
							key={i}
							className="floating-element absolute"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								transform: `rotate(${Math.random() * 360}deg)`,
								opacity: 0.1,
							}}
						>
							<div className="text-6xl">🌸</div>
						</div>
					))}
				</div>

				<div className="container mx-auto px-6 text-center relative z-10">
					<h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] animate-float">
						Omidnw World
					</h1>
					<p className="text-2xl mb-12 max-w-2xl mx-auto">
						Your ultimate anime schedule companion. Stay up-to-date with airing
						times and never miss your favorite shows!
					</p>
					<div className="flex justify-center items-center">
						<Link
							to="/schedule"
							className="group relative inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 overflow-hidden"
						>
							<span className="relative z-10 flex items-center">
								<CalendarIcon className="w-6 h-6 mr-2" />
								View Schedule
							</span>
							<div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-24 bg-[var(--background)]">
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold text-center mb-16">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
							Schedule Features
						</span>
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						{/* Feature Card 1 */}
						<div className="feature-card group">
							<div className="bg-[var(--background)] p-8 rounded-2xl text-center shadow-lg transform transition-all duration-300 hover:scale-105 border border-[var(--primary)] hover:border-[var(--secondary)] relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-10 transition-opacity" />
								<div className="relative z-10">
									<div className="w-16 h-16 bg-[var(--primary)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
										<CalendarIcon className="w-8 h-8 text-[var(--primary)]" />
									</div>
									<h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">
										Weekly Schedule
									</h3>
									<p className="text-[var(--text)] opacity-80">
										View the complete weekly schedule of all airing anime
										series.
									</p>
								</div>
							</div>
						</div>

						{/* Feature Card 2 */}
						<div className="feature-card group">
							<div className="bg-[var(--background)] p-8 rounded-2xl text-center shadow-lg transform transition-all duration-300 hover:scale-105 border border-[var(--primary)] hover:border-[var(--secondary)] relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-10 transition-opacity" />
								<div className="relative z-10">
									<div className="w-16 h-16 bg-[var(--primary)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
										<CalendarIcon className="w-8 h-8 text-[var(--primary)]" />
									</div>
									<h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">
										Search & Filter
									</h3>
									<p className="text-[var(--text)] opacity-80">
										Find shows by year, season, or search for specific titles.
									</p>
								</div>
							</div>
						</div>

						{/* Feature Card 3 */}
						<div className="feature-card group">
							<div className="bg-[var(--background)] p-8 rounded-2xl text-center shadow-lg transform transition-all duration-300 hover:scale-105 border border-[var(--primary)] hover:border-[var(--secondary)] relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] opacity-0 group-hover:opacity-10 transition-opacity" />
								<div className="relative z-10">
									<div className="w-16 h-16 bg-[var(--primary)] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
										<CalendarIcon className="w-8 h-8 text-[var(--primary)]" />
									</div>
									<h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">
										Detailed Info
									</h3>
									<p className="text-[var(--text)] opacity-80">
										Access comprehensive details about each show, including
										synopsis and translations.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-24 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-10" />
				<div className="container mx-auto px-6 text-center relative z-10">
					<h2 className="text-4xl font-bold mb-8">
						Ready to Explore the Schedule?
					</h2>
					<Link
						to="/schedule"
						className="inline-flex items-center bg-[var(--primary)] text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300"
					>
						<CalendarIcon className="w-6 h-6 mr-2" />
						View Schedule
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Home;
