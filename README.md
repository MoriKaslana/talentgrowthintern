# CinemaHub - Movie Discovery App

A modern, responsive web application for discovering and exploring movies using the TMDB (The Movie Database) API. Built with React, TypeScript, and Tailwind CSS.

## Features

### 🎬 Movie Discovery
- **Browse Movies**: Explore popular, now playing, top-rated, and upcoming movies
- **Search Functionality**: Search for movies by title with real-time results
- **Movie Details**: View comprehensive information including plot, cast, ratings, and production details
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔐 Authentication System
- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication using localStorage
- **User Profile**: Personalized user dashboard with favorite movies
- **Favorites Management**: Add/remove movies from your favorites list

### 📱 Responsive Layout
- **Mobile-First Design**: Fully responsive layout that works on all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Adaptive Navigation**: Smart navigation that adjusts to different screen sizes

### 🎨 Modern UI/UX
- **Cinema-Themed Design**: Dark theme with golden accents inspired by movie theaters
- **Smooth Animations**: Elegant transitions and hover effects
- **Glass Morphism**: Modern glass card effects for a premium feel
- **Loading States**: Beautiful loading spinners and skeleton screens

## API Integration

This application uses the [TMDB API](https://www.themoviedb.org/documentation/api) to fetch movie data:

- **Popular Movies**: `/movie/popular`
- **Search Movies**: `/search/movie`
- **Movie Details**: `/movie/{movie_id}`
- **Now Playing**: `/movie/now_playing`
- **Top Rated**: `/movie/top_rated`
- **Upcoming**: `/movie/upcoming`

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **HTTP Client**: Axios for API requests
- **Routing**: React Router v6
- **State Management**: React hooks and localStorage
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Notifications**: Sonner for toast notifications

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── MovieCard.tsx   # Movie display card
│   ├── SearchBar.tsx   # Search functionality
│   ├── Header.tsx      # Navigation header
│   └── ...
├── pages/              # Page components
│   ├── Index.tsx       # Home page with movie listings
│   ├── LoginPage.tsx   # User authentication
│   ├── ProfilePage.tsx # User profile and favorites
│   └── MovieDetail.tsx # Detailed movie information
├── lib/                # Utility functions
│   ├── api.ts          # TMDB API integration
│   ├── auth.ts         # Authentication logic
│   └── utils.ts        # Helper functions
├── types/              # TypeScript type definitions
│   └── movie.ts        # Movie data types
└── hooks/              # Custom React hooks
    └── useAuth.ts      # Authentication hook
```

## Error Handling

- **Network Errors**: Graceful handling of API failures with retry options
- **Empty States**: User-friendly messages when no data is available
- **404 Errors**: Custom not found pages for invalid routes
- **Loading States**: Loading indicators during data fetching
- **Form Validation**: Client-side validation for authentication forms

## Responsive Features

- **Breakpoint System**: Mobile-first responsive design
- **Flexible Grids**: Adaptive movie card layouts
- **Touch Interactions**: Optimized for mobile gestures
- **Viewport Optimization**: Proper scaling for all devices

## Version Control

This project uses Git for version control with descriptive commit messages following the format:
```
feat(talent-growth): Add new feature description
fix(talent-growth): Fix bug description
docs(talent-growth): Update documentation
```

## Future Enhancements

- [ ] Movie recommendations based on user preferences
- [ ] Watchlist functionality
- [ ] Movie trailers integration
- [ ] Social features (reviews, ratings)
- [ ] Advanced filtering and sorting options
- [ ] Dark/light theme toggle
- [ ] Offline support with PWA features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- **Lazy Loading**: Images load on demand
- **Code Splitting**: Route-based code splitting
- **Caching**: API response caching with React Query
- **Optimized Images**: Responsive image loading from TMDB CDN

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Proper focus indicators

## License

This project is built for educational purposes using the TMDB API. Please refer to [TMDB's terms of service](https://www.themoviedb.org/terms-of-use) for API usage guidelines.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat(talent-growth): Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues or questions, please open an issue in the GitHub repository or contact the development team.

## Deployment Link
https://talentgrowthintern.vercel.app/ 
