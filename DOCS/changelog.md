# Changelog - Netflix Clone

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned - Deadline: 2026-03-27
- [ ] **feat**: Add dropdown menus for filters
- [ ] **feat**: Implement advanced filters (genre, year, rating)
- [ ] **feat**: Add theme switcher (light/dark mode)
- [ ] **feat**: Add pagination component
- [ ] **feat**: Implement infinite scroll
- [ ] **feat**: Add watchlist/favorites functionality
- [ ] **feat**: Add recently watched section
- [ ] **feat**: Implement video player for trailers

---

## [0.1.0] - Release Date: 2026-03-13 ✅ **RELEASED**

### Added
- **feat**: Project initialization with Vite + React + TypeScript
- **feat**: Tailwind CSS configuration
- **feat**: shadcn/ui components integration
  - Button
  - Card
  - Input
  - Badge
  - Avatar
  - Skeleton
  - Tabs
- **feat**: React Router DOM v6 setup
- **feat**: TMDB API integration
  - API client with error handling
  - All TMDB endpoints implemented
  - TypeScript types for TMDB responses

### Infrastructure
- **feat**: Base folder structure created
- **feat**: Environment variables configuration (.env, .env.example)
- **feat**: Constants and utilities setup
- **feat**: Custom hooks implementation
  - useMedia (trending, popular, top rated, etc.)
  - useSearch (multi, movies, tv, people)
  - useGenres (movies, tv)
  - useInfiniteScroll

### Components
- **feat**: Layout components
  - Header with navigation and search
  - Footer with links and social
- **feat**: Media components
  - MediaCard (poster, rating, year)
  - MediaCardSkeleton
  - MediaGrid (grid layout)
  - MediaRow (horizontal scroll with arrows)
  - HeroBanner (featured content)
- **feat**: Search components
  - SearchBar
  - SearchResults (with tabs for movies, tv, people)
- **feat**: Detail components
  - CastSection
  - SimilarMedia
  - VideoPlayer

### Pages
- **feat**: Home page with hero banner and media rows
- **feat**: Movies page with tabs (Popular, Top Rated, Upcoming)
- **feat**: TV Shows page with tabs (Popular, Top Rated, On The Air)
- **feat**: Search page with multi-search and history
- **feat**: Media Detail page (movies and tv)

### Documentation
- **docs**: api_endpoints.md - Complete TMDB API documentation
- **docs**: implementacion.md - Implementation rules and conventions
- **docs**: changelog.md - Version history and roadmap
- **docs**: README.md - Installation and usage instructions

---

## Roadmap

### [0.2.0] - Deadline: 2026-03-27 (2 weeks)
**Theme & UI Enhancements**
- Light/Dark theme toggle
- Improved dropdown menus
- Enhanced filter components
- Better loading skeletons

### [0.3.0] - Deadline: 2026-04-10 (2 weeks)
**User Features**
- Watchlist/My List functionality
- Favorites system
- Recently watched history
- User preferences

### [0.4.0] - Deadline: 2026-04-24 (2 weeks)
**Performance & UX**
- Infinite scroll implementation
- Virtual scrolling for large lists
- Image lazy loading optimization
- Progressive image loading

### [0.5.0] - Deadline: 2026-05-08 (2 weeks)
**Advanced Features**
- Video player integration
- Trailer playback
- Episode selection for TV shows
- Season overview

### [1.0.0] - Deadline: 2026-05-22 (2 weeks)
**Production Ready**
- Full testing coverage
- Performance optimization
- Accessibility audit
- SEO optimization
- Production deployment

---

## Version Schema

- **MAJOR** (X.0.0): Breaking changes, major features
- **MINOR** (0.X.0): New features, backwards compatible
- **PATCH** (0.0.X): Bug fixes, small improvements

---

## Release Notes Format

```markdown
## [VERSION] - Release Date: YYYY-MM-DD

### Added
- **feat**: Description of new feature

### Changed
- **change**: Description of change

### Deprecated
- **deprecation**: Description of deprecation

### Removed
- **removal**: Description of removal

### Fixed
- **fix**: Description of bug fix

### Security
- **security**: Description of security fix
```

---

## Commit Message Convention

```
feat(scope): description of new feature
fix(scope): description of bug fix
docs(scope): description of documentation change
style(scope): description of style change
refactor(scope): description of refactoring
perf(scope): description of performance improvement
test(scope): description of test addition/modification
chore(scope): description of build process or auxiliary tool change
```

**Examples:**
```
feat(media): add infinite scroll component
fix(search): debounce not working on rapid typing
docs(readme): update installation instructions
style(button): fix hover state inconsistency
refactor(api): extract error handling to utility
perf(images): add lazy loading to all images
test(hooks): add unit tests for useMedia
chore(deps): upgrade react-router-dom to v7
```

---

## Sprint Planning

### Sprint 1 (2026-03-13 - 2026-03-27) ✅
- [x] Project setup
- [x] Base components
- [x] TMDB integration
- [x] Core pages
- [x] Documentation

### Sprint 2 (2026-03-27 - 2026-04-10)
- [ ] Theme switcher
- [ ] Dropdown components
- [ ] Filter components
- [ ] Enhanced skeletons

### Sprint 3 (2026-04-10 - 2026-04-24)
- [ ] Watchlist functionality
- [ ] Favorites system
- [ ] User preferences
- [ ] Local storage persistence

### Sprint 4 (2026-04-24 - 2026-05-08)
- [ ] Infinite scroll
- [ ] Virtual scrolling
- [ ] Image optimization
- [ ] Performance improvements

### Sprint 5 (2026-05-08 - 2026-05-22)
- [ ] Video player
- [ ] Trailer playback
- [ ] Episode management
- [ ] Season overview

### Sprint 6 (2026-05-22 - 2026-06-05)
- [ ] Testing suite
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] Production deployment

---

## Contributors

- CodeIA Team

## License

Educational purposes only.
