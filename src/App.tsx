import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import AnimeDetails from "./pages/AnimeDetails";

function App() {
	return (
		<ThemeProvider>
			<Router basename="/anime-schedule">
				<div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text)]">
					<Header />
					<main className="flex-grow">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/schedule" element={<Schedule />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/anime/:id" element={<AnimeDetails />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</Router>
		</ThemeProvider>
	);
}

export default App;
