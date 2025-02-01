import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const About: React.FC = () => {
	return (
		<div className="container mx-auto px-6 py-12">
			<Link
				to="/"
				className="inline-flex items-center text-[var(--secondary)] hover:text-[var(--primary)] mb-8 transition-colors font-medium"
			>
				<ArrowLeftIcon className="w-5 h-5 mr-2" />
				Back to Home
			</Link>

			<div className="max-w-3xl mx-auto backdrop-blur-sm bg-[var(--background)]/80 border-2 border-[var(--primary)] rounded-xl shadow-2xl p-8 relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
				<div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

				<h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent mb-8">
					About Me
				</h1>

				<div className="space-y-8 text-[var(--text)] relative z-10">
					<div className="prose prose-lg">
						<p className="text-lg leading-relaxed">
							As someone who has always been passionate about anime, I really
							wanted to create something practical and useful in my GitHub that
							everyone could use and enjoy. This project is a manifestation of
							that desire.
						</p>

						<p className="text-lg leading-relaxed">
							I hope you enjoy using this website and find it valuable.
						</p>
					</div>

					<div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/5 rounded-xl p-8 backdrop-blur-sm border border-[var(--primary)]/20">
						<h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
							Connect With Me
						</h2>
						<ul className="space-y-6">
							<li className="flex items-center transform hover:translate-x-2 transition-all duration-300">
								<strong className="min-w-[120px] text-[var(--secondary)]">
									Anime-Planet:
								</strong>
								<a
									href="https://www.anime-planet.com/users/omidnw/anime/watching"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-2 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 px-4 py-2 rounded-lg transition-all duration-300 text-white font-medium ml-4"
								>
									<span>@omidnw</span>
									<svg
										className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							</li>
							<li className="flex items-center transform hover:translate-x-2 transition-all duration-300">
								<strong className="min-w-[120px] text-[var(--secondary)]">
									GitHub:
								</strong>
								<a
									href="https://www.github.com/omidnw"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-2 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 px-4 py-2 rounded-lg transition-all duration-300 text-white font-medium ml-4"
								>
									<span>@omidnw</span>
									<svg
										className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							</li>
							<li className="flex items-center transform hover:translate-x-2 transition-all duration-300">
								<strong className="min-w-[120px] text-[var(--secondary)]">
									LinkedIn:
								</strong>
								<a
									href="https://www.linkedin.com/in/omid-reza-keshtkar"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-2 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 px-4 py-2 rounded-lg transition-all duration-300 text-white font-medium ml-4"
								>
									<span>Omid Reza Keshtkar</span>
									<svg
										className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							</li>
						</ul>
						<div className="mt-6 p-4 bg-[var(--background)]/40 rounded-lg backdrop-blur-sm">
							<p className="text-sm text-[var(--text)] leading-relaxed">
								<strong className="text-[var(--secondary)]">
									Note for Apple Users:
								</strong>{" "}
								You can find my iCloud through LinkedIn and message me on
								iMessage. Please mention that you found me through this website,
								otherwise, I'll have to block the message.
							</p>
						</div>
					</div>

					<div className="mt-8 pt-6 relative">
						<div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 blur-xl"></div>
						<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent relative z-10">
							Creative Vision
						</h2>
						<p className="text-lg leading-relaxed relative z-10">
							Being both an otaku and a programmer brings a unique perspective
							to software development. Many of today's exceptional programmers
							share this passion, as it fuels creativity and drives innovation
							in ways that transcend conventional approaches. This combination
							of technical skill and otaku culture often leads to creating
							something truly special.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
