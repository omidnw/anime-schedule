# Omidnw World - Anime Schedule

A modern anime schedule application built with React, TypeScript, and Vite. Stay up-to-date with your favorite anime shows, explore seasonal releases, and discover new series.

## Features

- 📅 Weekly Schedule: View anime broadcasts organized by day of the week
- 🗓️ Seasonal Anime: Browse anime by season and year
- 🔍 Search Functionality: Find specific anime titles
- 🌐 Translation Support: Translate anime descriptions to your preferred language
- 🎨 Theme Customization: Choose from Dark, Light, Anime, and Retro themes
- 📱 Responsive Design: Optimized for both desktop and mobile devices

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Heroicons
- Jikan API (for anime data)
- LibreTranslate API (for translations)

## Getting Started

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd anime-schedule
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── assets/      # Static assets (images, fonts)
├── components/  # Reusable React components
├── contexts/    # React context providers
├── hooks/       # Custom React hooks
├── pages/       # Page-level components
├── services/    # API services
├── styles/      # Global styles
├── types/       # TypeScript type definitions
└── utils/       # Utility functions
```

## Features in Detail

### Theme System

- Multiple theme options (Dark, Light, Anime, Retro)
- Persistent theme selection
- Smooth theme transitions

### Schedule Views

- Card and table view options
- Detailed anime information
- Broadcast time in JST
- Episode count and status

### Translation

- Support for multiple languages
- RTL language support
- Automatic language detection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
