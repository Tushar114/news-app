# React Typescript Innoscripta News Application

A single-page application built using React, Typescript, and TawilwindCss. It is the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format.
The application generates Breaking news from 3 sources that are NewsAPI.org, the New York Times and The Guardian, and users can search for articles by keyword and filter the results by date, source and category.
Also, users can personalized news feed that able to customize their news feed by selecting their preferred source and categories.

## Features

- The application fetches Breaking news from 3 sources that are NewsAPI.org, the New York Times and The Guardian.
- The user can search for articles by keyword.
- The user can filter the results by date, source and category.
- The user can personalized news feed that able to customize their news feed by selecting their preferred source and categories.
- Responsive Design
- A decent UI/UX
- Error Handling

## Development

clone Innoscripta-news-app to your local machine. Then
to install its dependencies run

```sh
npm install
```

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
