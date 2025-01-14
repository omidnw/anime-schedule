import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "../public");

const server = http.createServer((req, res) => {
	// Determine the file path based on the request URL
	const filePath = path.join(
		PUBLIC_DIR,
		req.url === "/" ? "index.html" : req.url!
	);

	// Check if the file exists
	fs.exists(filePath, (exists) => {
		if (!exists) {
			// If the file doesn't exist, return a 404 error
			res.writeHead(404, { "Content-Type": "text/html" });
			res.end("<h1>404 Not Found</h1>");
			return;
		}

		// Read and serve the file
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(500, { "Content-Type": "text/html" });
				res.end("<h1>500 Internal Server Error</h1>");
				return;
			}

			// Set the appropriate content type based on the file extension
			const extname = path.extname(filePath);
			let contentType = "text/html";
			switch (extname) {
				case ".css":
					contentType = "text/css";
					break;
				case ".js":
					contentType = "text/javascript";
					break;
				case ".json":
					contentType = "application/json";
					break;
				case ".png":
					contentType = "image/png";
					break;
				case ".jpg":
					contentType = "image/jpg";
					break;
			}

			// Serve the file with the correct content type
			res.writeHead(200, { "Content-Type": contentType });
			res.end(data);
		});
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
