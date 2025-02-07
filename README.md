# News Application

A single-page application built using React, Typescript, and TawilwindCss. It is the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format.
The application generates Breaking news from 3 sources that are NewsAPI.org, the New York Times and The Guardian, and users can search for articles by keyword and filter the results by date, source and category.
Also, users can personalized news feed that able to customize their news feed by selecting their preferred source and categories.

## Architecture

The application is built using:

- React
- TypeScript
- SWR for data fetching
- Axios for API requests
- TailwindCSS for styling

## Features

- The application fetches Breaking news from 3 sources that are NewsAPI.org, the New York Times and The Guardian.
- The user can search for articles by keyword.
- The user can filter the results by date, source and category.
- The user can personalized news feed that able to customize their news feed by selecting their preferred source and categories.
- Responsive Design
- A decent UI/UX
- Error Handling

## Development

clone the news-app to your local machine. Then
to install its dependencies run

```sh
npm install
```

## Environment Setup

1. Copy the `.env.example` file to `.env`:
   Create a copy of .env.example file and name it .env; the default API keys are provided in the .env.example.

```sh
cp .env.example .env
```

## Technologies

- **React**: Utilized for the developing the user interfaces.
- **Vite**: used as the bundler for the React app; It's a fast build tool for modern web development, and supports typescript out of the box.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability in the React app.
- - Tailwind CSS - A utility-first CSS framework.
- **Prettifier**: Code formatting is maintained with Prettier, ensuring a consistent and clean codebase.

## Running with Docker

### Option 1: Using Docker Compose (Recommended)

1. Build and start the container:

```bash
docker-compose up --build
```

2. Access the application at `http://localhost:3000`

3. To stop the container:

```bash
docker-compose down
```

### Option 2: Using Docker directly

1. Build the Docker image:

```bash
docker build -t news-aggregator .
```

2. Run the container:

```bash
docker run -p 3000:3000 news-aggregator
```

## Running Locally (Without Docker)

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Access the application at `http://localhost:3000`

## Development Commands

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run lint` - Run linter
- `npm run format` - Format code with Prettier
